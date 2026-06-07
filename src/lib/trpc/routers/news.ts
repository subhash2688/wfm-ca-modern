import { z } from "zod";
import { router, publicProcedure } from "@/lib/trpc/init";
import { db } from "@/lib/db";

export const newsRouter = router({
  list: publicProcedure.query(() =>
    db.news.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishDate: "desc" },
      select: { id: true, title: true, slug: true, shortDesc: true, imagePath: true, publishDate: true, category: true },
    })
  ),
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => db.news.findUnique({ where: { slug: input.slug, status: "PUBLISHED" } })),
});
