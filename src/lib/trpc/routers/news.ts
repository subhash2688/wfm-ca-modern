import { z } from "zod";
import { router, publicProcedure } from "@/lib/trpc/init";
import { db } from "@/lib/db";

export const newsRouter = router({
  list: publicProcedure.query(async () => {
    return db.news.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishDate: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        shortDesc: true,
        imagePath: true,
        publishDate: true,
      },
    });
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return db.news.findUnique({
        where: { slug: input.slug, status: "PUBLISHED" },
      });
    }),
});
