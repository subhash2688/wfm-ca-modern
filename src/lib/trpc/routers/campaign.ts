import { z } from "zod";
import { router, publicProcedure } from "@/lib/trpc/init";
import { db } from "@/lib/db";

export const campaignRouter = router({
  list: publicProcedure.query(() =>
    db.campaign.findMany({ where: { status: "PUBLISHED", isActive: true }, orderBy: { createdAt: "desc" } })
  ),
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => db.campaign.findUnique({ where: { slug: input.slug, status: "PUBLISHED" } })),
});
