import { z } from "zod";
import { router, publicProcedure, adminProcedure } from "@/lib/trpc/init";
import { db } from "@/lib/db";

export const pageRouter = router({
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return db.page.findUnique({
        where: { slug: input.slug, status: "PUBLISHED" },
      });
    }),

  list: publicProcedure.query(async () => {
    return db.page.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
    });
  }),

  // Admin: list all pages including drafts
  adminList: adminProcedure.query(async () => {
    return db.page.findMany({
      orderBy: { updatedAt: "desc" },
      include: { createdBy: { select: { firstName: true, lastName: true } } },
    });
  }),
});
