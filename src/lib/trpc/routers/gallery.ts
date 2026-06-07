import { z } from "zod";
import { router, publicProcedure } from "@/lib/trpc/init";
import { db } from "@/lib/db";

export const galleryRouter = router({
  list: publicProcedure.query(() =>
    db.gallery.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      include: { images: { orderBy: { sortOrder: "asc" } } },
    })
  ),
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) =>
      db.gallery.findUnique({
        where: { slug: input.slug, status: "PUBLISHED" },
        include: { images: { orderBy: { sortOrder: "asc" } } },
      })
    ),
});
