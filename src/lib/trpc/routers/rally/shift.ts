import { z } from "zod";
import { router, protectedProcedure } from "@/lib/trpc/init";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/rally/services";
import type { RallyShiftType, RallyServiceType, RallyShiftStatus, RallySignupStatus } from "@prisma/client";

function parseTime(timeStr: string): Date {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const d = new Date(0);
  d.setUTCHours(hours, minutes, 0, 0);
  return d;
}

const ACTIVE_SIGNUP_STATUSES = ["cancelled", "no_show"] as RallySignupStatus[];

const shiftIncludes = {
  campus: true,
  _count: {
    select: {
      signups: { where: { status: { notIn: ACTIVE_SIGNUP_STATUSES } } },
    },
  },
};

export const shiftRouter = router({
  list: protectedProcedure.query(() =>
    db.rallyShift.findMany({
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
      include: shiftIncludes,
    })
  ),

  upcoming: protectedProcedure.query(() =>
    db.rallyShift.findMany({
      where: { date: { gte: new Date() }, status: { not: "cancelled" } },
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
      include: shiftIncludes,
    })
  ),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) =>
      db.rallyShift.findUnique({
        where: { id: input.id },
        include: {
          campus: true,
          signups: {
            where: { status: { notIn: ACTIVE_SIGNUP_STATUSES } },
            include: { volunteer: { select: { id: true, firstName: true, lastName: true, phone: true, status: true } } },
            orderBy: { signedUpAt: "asc" },
          },
        },
      })
    ),

  gaps: protectedProcedure.query(async () => {
    const shifts = await db.rallyShift.findMany({
      where: { date: { gte: new Date() }, status: { not: "cancelled" } },
      orderBy: [{ date: "asc" }],
      include: shiftIncludes,
    });
    return shifts.filter((s) => s._count.signups < s.requiredCount);
  }),

  create: protectedProcedure
    .input(z.object({
      campusId: z.number(),
      date: z.string(),
      startTime: z.string(),
      endTime: z.string(),
      shiftType: z.string(),
      serviceType: z.string(),
      requiredCount: z.number().default(4),
      notes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const shift = await db.rallyShift.create({
        data: {
          campusId: input.campusId,
          date: new Date(input.date),
          startTime: parseTime(input.startTime),
          endTime: parseTime(input.endTime),
          shiftType: input.shiftType as RallyShiftType,
          serviceType: input.serviceType as RallyServiceType,
          requiredCount: input.requiredCount,
          notes: input.notes,
        },
        include: { campus: true },
      });
      await logActivity("create", `Shift created at ${shift.campus.name} on ${input.date}`, undefined, shift.id);
      return shift;
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      shiftType: z.string().optional(),
      serviceType: z.string().optional(),
      status: z.string().optional(),
      requiredCount: z.number().optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const shift = await db.rallyShift.update({
        where: { id },
        data: {
          ...(data.shiftType && { shiftType: data.shiftType as RallyShiftType }),
          ...(data.serviceType && { serviceType: data.serviceType as RallyServiceType }),
          ...(data.status && { status: data.status as RallyShiftStatus }),
          ...(data.requiredCount !== undefined && { requiredCount: data.requiredCount }),
          ...(data.notes !== undefined && { notes: data.notes }),
        },
      });
      await logActivity("update", `Shift ${id} updated`, undefined, id);
      return shift;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.rallyShift.delete({ where: { id: input.id } });
      await logActivity("delete", `Shift ${input.id} deleted`, undefined, input.id);
      return { ok: true };
    }),
});
