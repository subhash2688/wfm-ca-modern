import { router, publicProcedure } from "@/lib/trpc/init";
import { db } from "@/lib/db";

export const faqRouter = router({
  list: publicProcedure.query(() =>
    db.faq.findMany({ where: { status: "PUBLISHED" }, orderBy: { sortOrder: "asc" } })
  ),
});
