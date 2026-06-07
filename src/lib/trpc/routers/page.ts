import { z } from "zod";
import { router, publicProcedure, adminProcedure } from "@/lib/trpc/init";
import { db } from "@/lib/db";

export const pageRouter = router({
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => db.page.findUnique({ where: { slug: input.slug, status: "PUBLISHED" } })),
  list: publicProcedure.query(() =>
    db.page.findMany({ where: { status: "PUBLISHED" }, orderBy: { createdAt: "desc" } })
  ),
  adminList: adminProcedure.query(() =>
    db.page.findMany({
      orderBy: { updatedAt: "desc" },
      include: { createdBy: { select: { firstName: true, lastName: true } } },
    })
  ),
});
