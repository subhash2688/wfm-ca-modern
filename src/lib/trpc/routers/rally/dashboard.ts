import { router, protectedProcedure } from "@/lib/trpc/init";
import { getDashboardStats } from "@/lib/rally/services";
import { db } from "@/lib/db";

export const dashboardRouter = router({
  stats: protectedProcedure.query(async () => {
    const [stats, recentActivity] = await Promise.all([
      getDashboardStats(),
      db.rallyActivityLog.findMany({
        orderBy: { timestamp: "desc" },
        take: 10,
        include: {
          volunteer: { select: { firstName: true, lastName: true } },
        },
      }),
    ]);
    return { ...stats, recentActivity };
  }),
});
