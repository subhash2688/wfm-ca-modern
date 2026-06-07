import { z } from "zod";
import { router, protectedProcedure } from "@/lib/trpc/init";
import { db } from "@/lib/db";
import { logActivity } from "@/lib/rally/services";

export const campusRouter = router({
  list: protectedProcedure.query(() =>
    db.rallyCampus.findMany({ orderBy: { name: "asc" } })
  ),

  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
      city: z.string().min(1),
      zipCode: z.string().min(1),
      region: z.string().min(1),
      color: z.string().default("blue"),
    }))
    .mutation(async ({ input }) => {
      const campus = await db.rallyCampus.create({ data: input });
      await logActivity("create", `Campus created: ${campus.name}`);
      return campus;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const campus = await db.rallyCampus.findUnique({ where: { id: input.id } });
      await db.rallyCampus.delete({ where: { id: input.id } });
      await logActivity("delete", `Campus deleted: ${campus?.name ?? input.id}`);
      return { ok: true };
    }),
});
