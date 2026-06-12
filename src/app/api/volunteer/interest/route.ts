import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { VolunteerLeadType } from "@prisma/client";

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.length === 10 ? `1${digits}` : digits;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      firstName?: string;
      lastName?: string;
      phone?: string;
      email?: string;
      campusName?: string;
      volunteerType?: "individual" | "regular" | "group";
      groupName?: string;
      groupSize?: number;
      availability?: Record<string, string[]>;
    };

    const { firstName, lastName, phone, email, campusName, volunteerType, groupName, groupSize, availability } = body;

    // Validate required fields
    if (!firstName || !lastName || !phone || !campusName) {
      return NextResponse.json(
        { ok: false, error: "firstName, lastName, phone, and campusName are required." },
        { status: 400 }
      );
    }

    const normalized = normalizePhone(phone);

    // Check if phone already belongs to an active RallyVolunteer
    const existingVolunteer = await db.rallyVolunteer.findUnique({
      where: { phone: normalized },
      select: { status: true },
    });
    if (existingVolunteer && existingVolunteer.status === "active") {
      return NextResponse.json({
        ok: false,
        error: "You're already registered! Sign in at /v/login",
      });
    }

    // Check if phone already has a VolunteerLead record
    const existingLead = await db.volunteerLead.findUnique({
      where: { phone: normalized },
    });
    if (existingLead) {
      return NextResponse.json({
        ok: false,
        error: "We already have your interest on file. We'll be in touch soon!",
      });
    }

    // Create the VolunteerLead record
    await db.volunteerLead.create({
      data: {
        firstName,
        lastName,
        phone: normalized,
        email: email ?? null,
        campusName,
        volunteerType: (volunteerType ?? "individual") as VolunteerLeadType,
        groupName: groupName ?? null,
        groupSize: groupSize ?? null,
        availability: (availability ?? {}) as object,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[volunteer/interest] POST error:", err);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
