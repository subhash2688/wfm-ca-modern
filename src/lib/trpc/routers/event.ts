import { z } from "zod";
import { router, publicProcedure } from "@/lib/trpc/init";

const events = [
  { id: 1, title: "Annual Volunteer Orientation — Fall 2026", slug: "annual-volunteer-orientation-fall-2026", shortDesc: "Join us for our fall volunteer orientation and learn how to get involved.", imagePath: "/images/resources/food-distribution-2.jpg", eventDate: new Date("2026-08-20"), endDate: new Date("2026-08-20"), venue: "UC Berkeley, Sproul Hall", status: "PUBLISHED" as const, metaTitle: null, metaDescription: null, content: "<p>All new volunteers are welcome. Learn about our delivery routes, meal prep process, and how you can make a difference on campus.</p>" },
  { id: 2, title: "Community Food Drive — Spring 2026", slug: "community-food-drive-spring-2026", shortDesc: "Help us stock our campus pantries ahead of finals season.", imagePath: "/images/resources/food-distribution-3.jpg", eventDate: new Date("2026-04-05"), endDate: new Date("2026-04-05"), venue: "Multiple Campus Locations", status: "PUBLISHED" as const, metaTitle: null, metaDescription: null, content: "<p>Drop off non-perishable items at any of our campus collection points. Every donation counts.</p>" },
  { id: 3, title: "Donor Appreciation Gala 2025", slug: "donor-appreciation-gala-2025", shortDesc: "A celebration of our incredible donors who make our mission possible.", imagePath: "/images/resources/food-distribution-4.jpg", eventDate: new Date("2025-12-10"), endDate: new Date("2025-12-10"), venue: "San Francisco, CA", status: "PUBLISHED" as const, metaTitle: null, metaDescription: null, content: "<p>Thank you to everyone who attended our annual gala. Together we raised over $80,000 for student meal programs.</p>" },
];

export const eventRouter = router({
  upcoming: publicProcedure.query(() => events.filter((e) => e.eventDate >= new Date())),
  list: publicProcedure.query(() => events),
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => events.find((e) => e.slug === input.slug) ?? null),
});
