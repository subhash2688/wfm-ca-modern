import { z } from "zod";
import { router, publicProcedure } from "@/lib/trpc/init";
import { db } from "@/lib/db";

export const eventRouter = router({
  upcoming: publicProcedure.query(() =>
    db.event.findMany({
      where: { status: "PUBLISHED", eventDate: { gte: new Date() } },
      orderBy: { eventDate: "asc" },
    })
  ),
  list: publicProcedure.query(() =>
    db.event.findMany({ where: { status: "PUBLISHED" }, orderBy: { eventDate: "desc" } })
  ),
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => db.event.findUnique({ where: { slug: input.slug, status: "PUBLISHED" } })),
});
