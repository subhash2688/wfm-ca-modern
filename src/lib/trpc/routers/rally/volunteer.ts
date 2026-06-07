import { z } from "zod";
import { router, protectedProcedure } from "@/lib/trpc/init";
import { db } from "@/lib/db";
import { logActivity, getVolunteerStats } from "@/lib/rally/services";
import type { RallyVolunteerStatus, RallySignupStatus, Prisma } from "@prisma/client";

export const volunteerRouter = router({
  list: protectedProcedure.query(async () => {
    const volunteers = await db.rallyVolunteer.findMany({ orderBy: { lastName: "asc" } });
    return Promise.all(
      volunteers.map(async (v) => {
        const stats = await getVolunteerStats(v.id);
        return { ...v, stats };
      })
    );
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const vol = await db.rallyVolunteer.findUnique({
        where: { id: input.id },
        include: {
          signups: {
            include: { shift: { include: { campus: true } } },
            orderBy: { signedUpAt: "desc" },
          },
        },
      });
      if (!vol) return null;
      const stats = await getVolunteerStats(input.id);
      return { ...vol, stats };
    }),

  create: protectedProcedure
    .input(z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      phone: z.string().min(1),
      email: z.string().email().optional(),
      preferredCampuses: z.array(z.string()).default([]),
      isYouth: z.boolean().default(false),
    }))
    .mutation(async ({ input }) => {
      const vol = await db.rallyVolunteer.create({
        data: {
          ...input,
          status: "active",
          preferredShiftTypes: [],
          availability: {},
        },
      });
      await logActivity("create", `Volunteer created: ${vol.firstName} ${vol.lastName}`, vol.id);
      return vol;
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      phone: z.string().optional(),
      email: z.string().optional(),
      status: z.string().optional(),
      notes: z.string().optional(),
      preferredCampuses: z.array(z.string()).optional(),
      preferredShiftTypes: z.array(z.string()).optional(),
      availability: z.record(z.string(), z.array(z.string())).optional(),
      isYouth: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, status, availability, ...rest } = input;
      const vol = await db.rallyVolunteer.update({
        where: { id },
        data: {
          ...rest,
          ...(status && { status: status as RallyVolunteerStatus }),
          ...(availability !== undefined && { availability: availability as Prisma.InputJsonValue }),
        },
      });
      await logActivity("update", `Volunteer ${id} updated`, id);
      return vol;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const vol = await db.rallyVolunteer.findUnique({ where: { id: input.id } });
      await db.rallyVolunteer.delete({ where: { id: input.id } });
      await logActivity("delete", `Volunteer deleted: ${vol?.firstName} ${vol?.lastName}`, input.id);
      return { ok: true };
    }),

  addToShift: protectedProcedure
    .input(z.object({ volunteerId: z.number(), shiftId: z.number() }))
    .mutation(async ({ input }) => {
      const signup = await db.rallySignup.create({
        data: {
          volunteerId: input.volunteerId,
          shiftId: input.shiftId,
          status: "confirmed",
          confirmedAt: new Date(),
        },
      });
      await logActivity("signup", `Staff added volunteer ${input.volunteerId} to shift ${input.shiftId}`, input.volunteerId, input.shiftId);
      return signup;
    }),

  suggestions: protectedProcedure
    .input(z.object({ shiftId: z.number() }))
    .query(async ({ input }) => {
      const { scoreVolunteersForShift } = await import("@/lib/rally/services");
      return scoreVolunteersForShift(input.shiftId);
    }),

  exportCsv: protectedProcedure.query(async () => {
    const { exportVolunteersCSV } = await import("@/lib/rally/services");
    return exportVolunteersCSV();
  }),
});
