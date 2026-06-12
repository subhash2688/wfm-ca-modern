import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createHmac } from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "rally_vol_session";
const OTP_EXPIRY_MINUTES = 10;
const SESSION_SECRET = process.env.RALLY_SESSION_SECRET ?? "dev-rally-secret-change-in-prod";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.length === 10 ? `1${digits}` : digits;
}

function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function signSession(volunteerId: number): string {
  const ts = String(Date.now());
  const payload = `${volunteerId}.${ts}`;
  const sig = createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

function verifySessionToken(token: string): { volunteerId: number } | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [id, ts, sig] = parts;
  const expected = createHmac("sha256", SESSION_SECRET).update(`${id}.${ts}`).digest("hex");
  if (sig !== expected) return null;
  const age = (Date.now() - Number(ts)) / 1000;
  if (age > SESSION_MAX_AGE) return null;
  const volunteerId = Number(id);
  if (!Number.isFinite(volunteerId)) return null;
  return { volunteerId };
}

export async function GET() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return NextResponse.json({ volunteer: null });
  const session = verifySessionToken(token);
  if (!session) return NextResponse.json({ volunteer: null });
  const volunteer = await db.rallyVolunteer.findUnique({
    where: { id: session.volunteerId },
    select: { id: true, firstName: true, lastName: true, phone: true, status: true },
  });
  if (!volunteer || volunteer.status === "inactive") return NextResponse.json({ volunteer: null });
  return NextResponse.json({ volunteer });
}

export async function POST(req: NextRequest) {
  const body = await req.json() as {
    action?: string;
    phone?: string;
    code?: string;
    firstName?: string;
    lastName?: string;
    preferredCampuses?: string[];
    preferredShiftTypes?: string[];
    isYouth?: boolean;
  };

  const {
    action,
    phone,
    code,
    firstName,
    lastName,
    preferredCampuses,
    preferredShiftTypes,
    isYouth,
  } = body;

  const normalized = normalizePhone(phone ?? "");

  if (action === "request-otp") {
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60_000);
    await db.rallySmsCode.updateMany({
      where: { phone: normalized, used: false },
      data: { used: true },
    });
    await db.rallySmsCode.create({
      data: { phone: normalized, code: otp, expiresAt },
    });

    const devMode = !process.env.TWILIO_ACCOUNT_SID;
    if (!devMode) {
      const twilio = (await import("twilio")).default;
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID!,
        process.env.TWILIO_AUTH_TOKEN!
      );
      await client.messages.create({
        body: `Your WFM Rally code: ${otp}. Valid ${OTP_EXPIRY_MINUTES} min.`,
        from: process.env.TWILIO_FROM_NUMBER!,
        to: `+${normalized}`,
      });
    }
    return NextResponse.json({
      ok: true,
      devMode,
      ...(devMode ? { code: otp } : {}),
    });
  }

  if (action === "verify-otp") {
    const record = await db.rallySmsCode.findFirst({
      where: {
        phone: normalized,
        code,
        used: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });
    if (!record) {
      return NextResponse.json(
        { error: "Invalid or expired code" },
        { status: 400 }
      );
    }
    await db.rallySmsCode.update({
      where: { id: record.id },
      data: { used: true },
    });

    const volunteer = await db.rallyVolunteer.findUnique({
      where: { phone: normalized },
    });
    if (volunteer) {
      if (volunteer.status !== "active") {
        return NextResponse.json(
          { error: "Your account isn't active yet. We'll text you once you're approved." },
          { status: 403 }
        );
      }
      const token = signSession(volunteer.id);
      const res = NextResponse.json({
        status: "existing",
        volunteerId: volunteer.id,
      });
      res.cookies.set(SESSION_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_MAX_AGE,
      });
      await db.rallyVolunteer.update({
        where: { id: volunteer.id },
        data: { lastSeen: new Date() },
      });
      return res;
    }
    return NextResponse.json({ status: "new", phone: normalized });
  }

  if (action === "register") {
    const existing = await db.rallyVolunteer.findUnique({
      where: { phone: normalized },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Phone already registered" },
        { status: 409 }
      );
    }
    const volunteer = await db.rallyVolunteer.create({
      data: {
        phone: normalized,
        firstName: firstName ?? "",
        lastName: lastName ?? "",
        preferredCampuses: preferredCampuses ?? [],
        preferredShiftTypes: preferredShiftTypes ?? [],
        isYouth: isYouth ?? false,
        status: "active",
        lastSeen: new Date(),
      },
    });
    const token = signSession(volunteer.id);
    const res = NextResponse.json({ ok: true, volunteerId: volunteer.id });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
    return res;
  }

  if (action === "logout") {
    const res = NextResponse.json({ ok: true });
    res.cookies.delete(SESSION_COOKIE);
    return res;
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
