import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  // ─── Campuses ────────────────────────────────────────────────
  const campuses = await Promise.all([
    db.rallyCampus.upsert({
      where: { name: "Berkeley Campus" },
      update: {},
      create: { name: "Berkeley Campus", city: "Berkeley", zipCode: "94720", region: "East Bay", color: "green" },
    }),
    db.rallyCampus.upsert({
      where: { name: "Oakland Campus" },
      update: {},
      create: { name: "Oakland Campus", city: "Oakland", zipCode: "94612", region: "East Bay", color: "blue" },
    }),
    db.rallyCampus.upsert({
      where: { name: "San Francisco Campus" },
      update: {},
      create: { name: "San Francisco Campus", city: "San Francisco", zipCode: "94102", region: "Bay Area", color: "amber" },
    }),
  ]);

  console.log(`✅ Seeded ${campuses.length} campuses`);

  // ─── Volunteers ──────────────────────────────────────────────
  const volunteers = await Promise.all([
    db.rallyVolunteer.upsert({
      where: { phone: "15105550101" },
      update: {},
      create: {
        firstName: "Priya", lastName: "Sharma",
        phone: "15105550101", email: "priya@example.com",
        status: "active", isYouth: false,
        preferredCampuses: ["Berkeley Campus"],
        preferredShiftTypes: ["Meal_Prep", "Packing"],
        availability: { sunday: ["morning", "afternoon"] },
      },
    }),
    db.rallyVolunteer.upsert({
      where: { phone: "15105550102" },
      update: {},
      create: {
        firstName: "Marcus", lastName: "Johnson",
        phone: "15105550102",
        status: "active", isYouth: false,
        preferredCampuses: ["Oakland Campus"],
        preferredShiftTypes: ["Delivery"],
        availability: { saturday: ["morning"] },
      },
    }),
    db.rallyVolunteer.upsert({
      where: { phone: "15105550103" },
      update: {},
      create: {
        firstName: "Aisha", lastName: "Patel",
        phone: "15105550103", email: "aisha@example.com",
        status: "active", isYouth: false,
        preferredCampuses: ["Berkeley Campus", "Oakland Campus"],
        preferredShiftTypes: ["Meal_Prep"],
        availability: { sunday: ["morning"], saturday: ["morning"] },
      },
    }),
    db.rallyVolunteer.upsert({
      where: { phone: "15105550104" },
      update: {},
      create: {
        firstName: "Devon", lastName: "Williams",
        phone: "15105550104",
        status: "active", isYouth: true,
        preferredCampuses: ["San Francisco Campus"],
        preferredShiftTypes: ["Packing", "Setup"],
        availability: { sunday: ["afternoon"] },
      },
    }),
    db.rallyVolunteer.upsert({
      where: { phone: "15105550105" },
      update: {},
      create: {
        firstName: "Sofia", lastName: "Martinez",
        phone: "15105550105", email: "sofia@example.com",
        status: "active", isYouth: false,
        preferredCampuses: ["Berkeley Campus"],
        preferredShiftTypes: ["Meal_Prep", "Packing", "Delivery"],
        availability: { sunday: ["morning", "afternoon"], saturday: ["morning", "afternoon"] },
      },
    }),
  ]);

  console.log(`✅ Seeded ${volunteers.length} volunteers`);

  // ─── Shifts ──────────────────────────────────────────────────
  const now = new Date();
  const nextSunday = new Date(now);
  nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7 || 7));
  const sundayAfter = new Date(nextSunday);
  sundayAfter.setDate(nextSunday.getDate() + 7);
  const nextSaturday = new Date(now);
  nextSaturday.setDate(now.getDate() + ((6 - now.getDay()) % 7 || 7));

  function time(h: number, m = 0) {
    const d = new Date(0);
    d.setUTCHours(h, m, 0, 0);
    return d;
  }

  const shifts = await Promise.all([
    db.rallyShift.create({
      data: {
        campusId: campuses[0].id,
        date: nextSunday,
        startTime: time(8),
        endTime: time(12),
        shiftType: "Meal_Prep",
        serviceType: "Catered_Meal",
        requiredCount: 6,
        status: "scheduled",
      },
    }),
    db.rallyShift.create({
      data: {
        campusId: campuses[0].id,
        date: nextSunday,
        startTime: time(12),
        endTime: time(15),
        shiftType: "Packing",
        serviceType: "Catered_Meal",
        requiredCount: 4,
        status: "scheduled",
      },
    }),
    db.rallyShift.create({
      data: {
        campusId: campuses[1].id,
        date: nextSunday,
        startTime: time(9),
        endTime: time(13),
        shiftType: "Meal_Prep",
        serviceType: "Catered_Meal",
        requiredCount: 5,
        status: "scheduled",
      },
    }),
    db.rallyShift.create({
      data: {
        campusId: campuses[2].id,
        date: nextSaturday,
        startTime: time(8, 30),
        endTime: time(11, 30),
        shiftType: "Delivery",
        serviceType: "Pre_packed_Meal",
        requiredCount: 3,
        status: "scheduled",
      },
    }),
    db.rallyShift.create({
      data: {
        campusId: campuses[0].id,
        date: sundayAfter,
        startTime: time(8),
        endTime: time(12),
        shiftType: "Meal_Prep",
        serviceType: "Catered_Meal",
        requiredCount: 6,
        status: "scheduled",
      },
    }),
  ]);

  console.log(`✅ Seeded ${shifts.length} shifts`);

  // ─── Signups ─────────────────────────────────────────────────
  const signups = await Promise.all([
    db.rallySignup.create({
      data: { volunteerId: volunteers[0].id, shiftId: shifts[0].id, status: "confirmed", confirmedAt: new Date() },
    }),
    db.rallySignup.create({
      data: { volunteerId: volunteers[2].id, shiftId: shifts[0].id, status: "confirmed", confirmedAt: new Date() },
    }),
    db.rallySignup.create({
      data: { volunteerId: volunteers[4].id, shiftId: shifts[0].id, status: "signed_up" },
    }),
    db.rallySignup.create({
      data: { volunteerId: volunteers[1].id, shiftId: shifts[2].id, status: "confirmed", confirmedAt: new Date() },
    }),
    db.rallySignup.create({
      data: { volunteerId: volunteers[3].id, shiftId: shifts[3].id, status: "signed_up" },
    }),
  ]);

  console.log(`✅ Seeded ${signups.length} signups`);

  // ─── Activity Log ────────────────────────────────────────────
  await db.rallyActivityLog.createMany({
    data: [
      { actionType: "seed", description: "Database seeded with initial data", timestamp: new Date() },
      { actionType: "signup", description: "Priya Sharma signed up for Berkeley Sunday shift", volunteerId: volunteers[0].id, shiftId: shifts[0].id, timestamp: new Date(Date.now() - 3600000) },
      { actionType: "signup", description: "Marcus Johnson signed up for Oakland Sunday shift", volunteerId: volunteers[1].id, shiftId: shifts[2].id, timestamp: new Date(Date.now() - 7200000) },
    ],
  });

  console.log("✅ Seeded activity log");
  console.log("\n🎉 Seed complete! Ready to test Rally.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
