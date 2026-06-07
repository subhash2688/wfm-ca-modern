import { router, publicProcedure } from "@/lib/trpc/init";
import { db } from "@/lib/db";

export const testimonialRouter = router({
  list: publicProcedure.query(() =>
    db.testimonial.findMany({ where: { status: "PUBLISHED" }, orderBy: { sortOrder: "asc" } })
  ),
});
