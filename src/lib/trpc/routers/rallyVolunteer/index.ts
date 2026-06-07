import { z } from "zod";
import { router, publicProcedure } from "@/lib/trpc/init";
import { db } from "@/lib/db";
import { logActivity, getVolunteerStats, getEarnedBadges } from "@/lib/rally/services";
import { TRPCError } from "@trpc/server";
import { createHmac } from "crypto";
import { cookies } from "next/headers";
import type { RallySignupStatus, Prisma } from "@prisma/client";

const SESSION_COOKIE = "rally_vol_session";
const SESSION_SECRET = process.env.RALLY_SESSION_SECRET ?? "dev-rally-secret-change-in-prod";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

const EXCLUDED_STATUSES = ["cancelled", "no_show"] as RallySignupStatus[];

function verifySession(token: string): number | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [id, ts, sig] = parts;
  const payload = `${id}.${ts}`;
  const expected = createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  if (sig !== expected) return null;
  const age = (Date.now() - Number(ts)) / 1000;
  if (age > SESSION_MAX_AGE) return null;
  return Number(id);
}

const volunteerProcedure = publicProcedure.use(async ({ next }) => {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) throw new TRPCError({ code: "UNAUTHORIZED" });
  const volunteerId = verifySession(token);
  if (!volunteerId) throw new TRPCError({ code: "UNAUTHORIZED" });
  const volunteer = await db.rallyVolunteer.findUnique({ where: { id: volunteerId } });
  if (!volunteer || volunteer.status === "inactive") throw new TRPCError({ code: "FORBIDDEN" });
  return next({ ctx: { volunteer } });
});

export const rallyVolunteerRouter = router({
  me: volunteerProcedure.query(async ({ ctx }) => {
    const stats = await getVolunteerStats(ctx.volunteer.id);
    const badges = getEarnedBadges(stats.totalShifts);
    return { ...ctx.volunteer, stats, badges };
  }),

  shifts: volunteerProcedure.query(async ({ ctx }) => {
    const now = new Date();
    const signedUpIds = await db.rallySignup.findMany({
      where: { volunteerId: ctx.volunteer.id, status: { notIn: EXCLUDED_STATUSES } },
      select: { shiftId: true },
    });
    const signedUpSet = new Set(signedUpIds.map((s) => s.shiftId));

    const shifts = await db.rallyShift.findMany({
      where: { date: { gte: now }, status: { not: "cancelled" } },
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
      include: {
        campus: true,
        _count: {
          select: {
            signups: { where: { status: { notIn: EXCLUDED_STATUSES } } },
          },
        },
      },
    });

    return shifts.map((s) => ({ ...s, isSignedUp: signedUpSet.has(s.id) }));
  }),

  shiftDetail: volunteerProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const shift = await db.rallyShift.findUnique({
        where: { id: input.id },
        include: {
          campus: true,
          _count: {
            select: {
              signups: { where: { status: { notIn: EXCLUDED_STATUSES } } },
            },
          },
        },
      });
      if (!shift) throw new TRPCError({ code: "NOT_FOUND" });

      const mySignup = await db.rallySignup.findFirst({
        where: { volunteerId: ctx.volunteer.id, shiftId: input.id, status: { notIn: EXCLUDED_STATUSES } },
      });

      return { ...shift, mySignup };
    }),

  signup: volunteerProcedure
    .input(z.object({ shiftId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const existing = await db.rallySignup.findFirst({
        where: { volunteerId: ctx.volunteer.id, shiftId: input.shiftId, status: { notIn: EXCLUDED_STATUSES } },
      });
      if (existing) throw new TRPCError({ code: "CONFLICT", message: "Already signed up" });

      const shift = await db.rallyShift.findUnique({ where: { id: input.shiftId } });
      if (!shift || shift.status === "cancelled") throw new TRPCError({ code: "BAD_REQUEST", message: "Shift unavailable" });

      const signup = await db.rallySignup.create({
        data: {
          volunteerId: ctx.volunteer.id,
          shiftId: input.shiftId,
          status: "signed_up",
        },
      });

      await logActivity("signup", `Volunteer ${ctx.volunteer.id} signed up for shift ${input.shiftId}`, ctx.volunteer.id, input.shiftId);
      return signup;
    }),

  cancelSignup: volunteerProcedure
    .input(z.object({ shiftId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const signup = await db.rallySignup.findFirst({
        where: { volunteerId: ctx.volunteer.id, shiftId: input.shiftId, status: { notIn: EXCLUDED_STATUSES } },
      });
      if (!signup) throw new TRPCError({ code: "NOT_FOUND" });

      const updated = await db.rallySignup.update({
        where: { id: signup.id },
        data: { status: "cancelled", cancelledAt: new Date() },
      });

      await logActivity("update", `Volunteer ${ctx.volunteer.id} cancelled shift ${input.shiftId}`, ctx.volunteer.id, input.shiftId);
      return updated;
    }),

  checkIn: volunteerProcedure
    .input(z.object({ shiftId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const excluded = ["cancelled", "no_show", "checked_in", "completed"] as RallySignupStatus[];
      const signup = await db.rallySignup.findFirst({
        where: { volunteerId: ctx.volunteer.id, shiftId: input.shiftId, status: { notIn: excluded } },
      });
      if (!signup) throw new TRPCError({ code: "NOT_FOUND", message: "No active signup found" });

      const updated = await db.rallySignup.update({
        where: { id: signup.id },
        data: { status: "checked_in", checkedInAt: new Date() },
      });

      await logActivity("check_in", `Volunteer ${ctx.volunteer.id} checked in for shift ${input.shiftId}`, ctx.volunteer.id, input.shiftId);
      return updated;
    }),

  myShifts: volunteerProcedure.query(async ({ ctx }) => {
    return db.rallySignup.findMany({
      where: { volunteerId: ctx.volunteer.id },
      include: { shift: { include: { campus: true } } },
      orderBy: { signedUpAt: "desc" },
    });
  }),

  updateProfile: volunteerProcedure
    .input(z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().email().optional().or(z.literal("")),
      preferredCampuses: z.array(z.string()).optional(),
      availability: z.record(z.string(), z.array(z.string())).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { availability, ...rest } = input;
      const vol = await db.rallyVolunteer.update({
        where: { id: ctx.volunteer.id },
        data: {
          ...(rest.firstName && { firstName: rest.firstName }),
          ...(rest.lastName && { lastName: rest.lastName }),
          ...(rest.email !== undefined && { email: rest.email || null }),
          ...(rest.preferredCampuses && { preferredCampuses: rest.preferredCampuses }),
          ...(availability && { availability: availability as Prisma.InputJsonValue }),
        },
      });
      return vol;
    }),

  stats: volunteerProcedure.query(async ({ ctx }) => {
    const stats = await getVolunteerStats(ctx.volunteer.id);
    const badges = getEarnedBadges(stats.totalShifts);
    return { ...stats, badges };
  }),
});
