import { router, publicProcedure } from "@/lib/trpc/init";
import { db } from "@/lib/db";

export const teamRouter = router({
  list: publicProcedure.query(() =>
    db.teamMember.findMany({ where: { status: "PUBLISHED" }, orderBy: { sortOrder: "asc" } })
  ),
});
