import { db } from "@/lib/db";
import type { RallyVolunteer } from "@prisma/client";

// ─── Constants ────────────────────────────────────────────────

export const MEALS_PER_SHIFT = 80;
export const OTP_EXPIRY_MINUTES = 10;
export const BADGE_THRESHOLDS = [
  { count: 1,  label: "First Step", emoji: "🌱" },
  { count: 5,  label: "Growing",    emoji: "🌿" },
  { count: 10, label: "Dedicated",  emoji: "⭐" },
  { count: 25, label: "Champion",   emoji: "🏆" },
  { count: 50, label: "Legend",     emoji: "🔥" },
] as const;

// ─── Stats ────────────────────────────────────────────────────

export interface VolunteerStats {
  totalShifts: number;
  totalHours: number;
  reliabilityPct: number;
  lastActive: Date | null;
  streak: number;
}

export async function getVolunteerStats(volunteerId: number): Promise<VolunteerStats> {
  const signups = await db.rallySignup.findMany({
    where: { volunteerId },
    include: { shift: true },
    orderBy: { signedUpAt: "desc" },
  });

  const completed = signups.filter((s) => s.status === "completed");
  const noShowed = signups.filter((s) => s.status === "no_show");

  const totalShifts = completed.length;
  const totalHours = completed.reduce((acc, s) => {
    const start = s.shift.startTime.getTime();
    const end = s.shift.endTime.getTime();
    return acc + (end - start) / 3_600_000;
  }, 0);

  const countable = completed.length + noShowed.length;
  const reliabilityPct = countable > 0 ? Math.round((completed.length / countable) * 100) : 100;
  const lastActive = completed[0]?.shift.date ?? null;
  const streak = getStreakFromDates(completed.map((s) => s.shift.date));

  return {
    totalShifts,
    totalHours: Math.round(totalHours * 10) / 10,
    reliabilityPct,
    lastActive,
    streak,
  };
}

function getWeekKey(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d.toISOString().slice(0, 10);
}

function getPrevWeekKey(weekKey: string): string {
  const d = new Date(weekKey);
  d.setDate(d.getDate() - 7);
  return d.toISOString().slice(0, 10);
}

function getStreakFromDates(dates: Date[]): number {
  if (dates.length === 0) return 0;
  const weeks = new Set(dates.map(getWeekKey));
  const sorted = [...weeks].sort((a, b) => b.localeCompare(a));
  let streak = 0;
  let expected = getWeekKey(new Date());
  for (const week of sorted) {
    if (week === expected) { streak++; expected = getPrevWeekKey(expected); }
    else break;
  }
  return streak;
}

export async function getShiftFillCount(shiftId: number): Promise<number> {
  return db.rallySignup.count({
    where: { shiftId, status: { notIn: ["cancelled", "no_show"] } },
  });
}

export interface DashboardStats {
  totalVolunteers: number;
  activeVolunteers: number;
  newVolunteers: number;
  totalShifts: number;
  upcomingShifts: number;
  completedShifts: number;
  totalSignups: number;
  completedSignups: number;
  totalHours: number;
  gaps: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const now = new Date();
  const [
    totalVolunteers, activeVolunteers, newVolunteers,
    totalShifts, upcomingShifts, completedShifts,
    totalSignups, completedSignups, upcoming,
  ] = await Promise.all([
    db.rallyVolunteer.count(),
    db.rallyVolunteer.count({ where: { status: "active" } }),
    db.rallyVolunteer.count({ where: { status: "new" } }),
    db.rallyShift.count(),
    db.rallyShift.count({ where: { date: { gte: now }, status: { not: "cancelled" } } }),
    db.rallyShift.count({ where: { status: "completed" } }),
    db.rallySignup.count(),
    db.rallySignup.count({ where: { status: "completed" } }),
    db.rallyShift.findMany({
      where: { date: { gte: now }, status: { not: "cancelled" } },
      include: {
        _count: { select: { signups: { where: { status: { notIn: ["cancelled", "no_show"] } } } } },
      },
    }),
  ]);

  const gaps = upcoming.filter((s) => s._count.signups < s.requiredCount).length;

  return {
    totalVolunteers, activeVolunteers, newVolunteers,
    totalShifts, upcomingShifts, completedShifts,
    totalSignups, completedSignups,
    totalHours: completedSignups * 3,
    gaps,
  };
}

// ─── Badges ───────────────────────────────────────────────────

export interface Badge { count: number; label: string; emoji: string; }

export function getEarnedBadges(totalShifts: number): Badge[] {
  return BADGE_THRESHOLDS.filter((b) => totalShifts >= b.count);
}

// ─── Scoring ──────────────────────────────────────────────────

export interface VolunteerSuggestion {
  volunteer: RallyVolunteer;
  score: number;
  breakdown: { campus: number; availability: number; reliability: number; recency: number };
}

export async function scoreVolunteersForShift(shiftId: number): Promise<VolunteerSuggestion[]> {
  const shift = await db.rallyShift.findUnique({
    where: { id: shiftId },
    include: {
      campus: true,
      signups: { where: { status: { notIn: ["cancelled", "no_show"] } } },
    },
  });
  if (!shift) return [];

  const signedUpIds = shift.signups.map((s) => s.volunteerId);
  const volunteers = await db.rallyVolunteer.findMany({
    where: { status: { in: ["active", "new"] }, id: { notIn: signedUpIds } },
  });

  const suggestions: VolunteerSuggestion[] = [];

  for (const vol of volunteers) {
    const stats = await getVolunteerStats(vol.id);
    const preferredCampuses = vol.preferredCampuses as string[];
    const campusScore = preferredCampuses.includes(shift.campus.name) ? 30 : 0;

    const availability = vol.availability as Record<string, string[]>;
    const shiftDay = shift.date.toLocaleDateString("en-US", { weekday: "long" });
    const shiftHour = shift.startTime.getHours();
    const timeSlot = shiftHour < 12 ? "Morning" : shiftHour < 17 ? "Afternoon" : "Evening";
    const availabilityScore = (availability[shiftDay] ?? []).includes(timeSlot) ? 25 : 0;

    const reliabilityScore = Math.round((stats.reliabilityPct / 100) * 25);
    let recencyScore = 0;
    if (stats.lastActive) {
      const days = Math.floor((Date.now() - stats.lastActive.getTime()) / 86_400_000);
      recencyScore = days <= 7 ? 20 : days <= 30 ? 15 : days <= 90 ? 10 : 5;
    }

    suggestions.push({
      volunteer: vol,
      score: campusScore + availabilityScore + reliabilityScore + recencyScore,
      breakdown: { campus: campusScore, availability: availabilityScore, reliability: reliabilityScore, recency: recencyScore },
    });
  }

  return suggestions.sort((a, b) => b.score - a.score);
}

// ─── CSV export ───────────────────────────────────────────────

export async function exportVolunteersCSV(): Promise<string> {
  const volunteers = await db.rallyVolunteer.findMany({ orderBy: { lastName: "asc" } });
  const header = "Name,Phone,Email,Status,Campuses,Total Shifts,Total Hours,Reliability %,Joined\n";
  const rows = await Promise.all(
    volunteers.map(async (v) => {
      const stats = await getVolunteerStats(v.id);
      const campuses = (v.preferredCampuses as string[]).join("; ");
      return [
        `"${v.firstName} ${v.lastName}"`, v.phone, v.email ?? "", v.status,
        `"${campuses}"`, stats.totalShifts, stats.totalHours, stats.reliabilityPct,
        v.joinedDate.toISOString().slice(0, 10),
      ].join(",");
    })
  );
  return header + rows.join("\n");
}

// ─── OTP / SMS ────────────────────────────────────────────────

export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.length === 10 ? `1${digits}` : digits;
}

export function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function sendOtp(phone: string): Promise<{ code: string; devMode: boolean }> {
  const normalized = normalizePhone(phone);
  const code = generateOtp();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60_000);

  await db.rallySmsCode.updateMany({ where: { phone: normalized, used: false }, data: { used: true } });
  await db.rallySmsCode.create({ data: { phone: normalized, code, expiresAt } });

  const devMode = !process.env.TWILIO_ACCOUNT_SID;
  if (!devMode) {
    const twilio = (await import("twilio")).default;
    const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);
    await client.messages.create({
      body: `Your WFM Rally code is: ${code}. Valid for ${OTP_EXPIRY_MINUTES} minutes.`,
      from: process.env.TWILIO_FROM_NUMBER!,
      to: `+${normalized}`,
    });
  }
  return { code, devMode };
}

export async function verifyOtp(phone: string, code: string): Promise<boolean> {
  const normalized = normalizePhone(phone);
  const record = await db.rallySmsCode.findFirst({
    where: { phone: normalized, code, used: false, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "desc" },
  });
  if (!record) return false;
  await db.rallySmsCode.update({ where: { id: record.id }, data: { used: true } });
  return true;
}

export function whatsappUrl(phone: string, message: string): string {
  const normalized = normalizePhone(phone);
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

export async function sendShiftReminders(): Promise<void> {
  if (!process.env.TWILIO_ACCOUNT_SID) return;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const start = new Date(tomorrow.toISOString().slice(0, 10));
  const end = new Date(start.getTime() + 86_400_000);

  const shifts = await db.rallyShift.findMany({
    where: { date: { gte: start, lt: end }, status: { not: "cancelled" } },
    include: {
      campus: true,
      signups: {
        where: { status: { notIn: ["cancelled", "no_show"] } },
        include: { volunteer: true },
      },
    },
  });

  const twilio = (await import("twilio")).default;
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN!);

  for (const shift of shifts) {
    const time = shift.startTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    for (const signup of shift.signups) {
      const msg = `Reminder: WFM shift tomorrow at ${shift.campus.name}, ${time}. Thank you!`;
      try {
        await client.messages.create({
          body: msg, from: process.env.TWILIO_FROM_NUMBER!, to: `+${normalizePhone(signup.volunteer.phone)}`,
        });
      } catch { console.error(`SMS failed for volunteer ${signup.volunteerId}`); }
    }
  }
}

// ─── Activity logging ─────────────────────────────────────────

export async function logActivity(
  actionType: "create" | "update" | "delete" | "check_in" | "signup" | "seed" | "export" | "sms" | "reset",
  description: string,
  volunteerId?: number,
  shiftId?: number
): Promise<void> {
  await db.rallyActivityLog.create({ data: { actionType, description, volunteerId, shiftId } });
}
