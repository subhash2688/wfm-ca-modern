import { z } from "zod";
import { router, publicProcedure } from "@/lib/trpc/init";
import { db } from "@/lib/db";

export const settingsRouter = router({
  get: publicProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ input }) => {
      const s = await db.setting.findUnique({ where: { key: input.key } });
      return s?.value ?? null;
    }),
  getMany: publicProcedure
    .input(z.object({ keys: z.array(z.string()) }))
    .query(({ input }) => db.setting.findMany({ where: { key: { in: input.keys } } })),
});
