import { router, publicProcedure } from "@/lib/trpc/init";
import { db } from "@/lib/db";

export const collegeRouter = router({
  list: publicProcedure.query(() =>
    db.college.findMany({
      where: { status: "ACTIVE" },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    })
  ),
});
