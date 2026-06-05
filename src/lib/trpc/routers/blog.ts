import { z } from "zod";
import { router, publicProcedure } from "@/lib/trpc/init";
import { db } from "@/lib/db";

export const blogRouter = router({
  list: publicProcedure.query(async () => {
    return db.blog.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishDate: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        shortDesc: true,
        imagePath: true,
        category: true,
        publishDate: true,
      },
    });
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return db.blog.findUnique({
        where: { slug: input.slug, status: "PUBLISHED" },
      });
    }),
});
