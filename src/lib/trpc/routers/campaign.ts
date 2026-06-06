import { z } from "zod";
import { router, publicProcedure } from "@/lib/trpc/init";

const campaigns = [
  { id: 1, name: "Feed 10,000 Students This Semester", slug: "feed-10000-students-this-semester", description: "Help us reach our biggest goal yet — 10,000 meals served in a single semester.", imagePath: "/images/resources/food-distribution-5.jpg", goalAmount: 50000, raisedAmount: 31200, isActive: true, startDate: null, endDate: null, createdAt: new Date("2026-01-01") },
  { id: 2, name: "New Campus Kitchen Equipment Fund", slug: "new-campus-kitchen-equipment-fund", description: "Raising funds to upgrade kitchen equipment at 5 campuses so we can serve more students faster.", imagePath: "/images/resources/food-serving.webp", goalAmount: 20000, raisedAmount: 8750, isActive: true, startDate: null, endDate: null, createdAt: new Date("2026-02-15") },
];

export const campaignRouter = router({
  list: publicProcedure.query(() => campaigns),
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => campaigns.find((c) => c.slug === input.slug) ?? null),
});
