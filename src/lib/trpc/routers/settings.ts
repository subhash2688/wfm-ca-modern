import { z } from "zod";
import { router, publicProcedure } from "@/lib/trpc/init";
import { db } from "@/lib/db";

export const settingsRouter = router({
  get: publicProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ input }) => {
      const setting = await db.setting.findUnique({
        where: { key: input.key },
      });
      return setting?.value ?? null;
    }),

  getMany: publicProcedure
    .input(z.object({ keys: z.array(z.string()) }))
    .query(async ({ input }) => {
      return db.setting.findMany({
        where: { key: { in: input.keys } },
      });
    }),
});
