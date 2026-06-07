import { z } from "zod";
import { router, protectedProcedure } from "@/lib/trpc/init";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/rally/services";
import type { RallySignupStatus } from "@prisma/client";

export const signupRouter = router({
  updateStatus: protectedProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["signed_up", "confirmed", "checked_in", "completed", "no_show", "cancelled"]),
    }))
    .mutation(async ({ input }) => {
      const now = new Date();
      const timestamps: Record<string, Date | undefined> = {
        confirmed: input.status === "confirmed" ? now : undefined,
        checked_in: input.status === "checked_in" ? now : undefined,
        completed: input.status === "completed" ? now : undefined,
        cancelled: input.status === "cancelled" ? now : undefined,
      };

      const signup = await db.rallySignup.update({
        where: { id: input.id },
        data: {
          status: input.status as RallySignupStatus,
          confirmedAt: timestamps.confirmed,
          checkedInAt: timestamps.checked_in,
          completedAt: timestamps.completed,
          cancelledAt: timestamps.cancelled,
        },
      });

      await logActivity(
        "update",
        `Signup ${input.id} status → ${input.status}`,
        signup.volunteerId,
        signup.shiftId
      );
      return signup;
    }),
});
