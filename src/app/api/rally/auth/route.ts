import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createHmac } from "crypto";

const SESSION_COOKIE = "rally_vol_session";
const OTP_EXPIRY_MINUTES = 10;

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.length === 10 ? `1${digits}` : digits;
}

function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function signSession(data: object): string {
  const secret = process.env.NEXTAUTH_SECRET ?? "dev-secret";
  const payload = Buffer.from(JSON.stringify(data)).toString("base64");
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
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
      const token = signSession({ volunteerId: volunteer.id, phone: normalized });
      const res = NextResponse.json({
        status: "existing",
        volunteerId: volunteer.id,
      });
      res.cookies.set(SESSION_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
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
    const token = signSession({ volunteerId: volunteer.id, phone: normalized });
    const res = NextResponse.json({ ok: true, volunteerId: volunteer.id });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
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
