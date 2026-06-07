import { z } from "zod";
import { router, publicProcedure } from "@/lib/trpc/init";
import { db } from "@/lib/db";

export const storyRouter = router({
  list: publicProcedure.query(() =>
    db.story.findMany({ where: { status: "PUBLISHED" }, orderBy: { publishDate: "desc" } })
  ),
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => db.story.findUnique({ where: { slug: input.slug, status: "PUBLISHED" } })),
});
