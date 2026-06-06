import { z } from "zod";
import { router, publicProcedure } from "@/lib/trpc/init";

const galleries = [
  {
    id: 1, title: "Food Distribution — Spring 2026", slug: "food-distribution-spring-2026",
    description: "Photos from our spring semester meal distributions across campuses.",
    coverImage: "/images/resources/food-distribution-1.jpg",
    createdAt: new Date("2026-04-01"),
    images: [
      { id: 1, imagePath: "/images/resources/food-distribution-1.jpg", altText: "Volunteers distributing meals", caption: null, sortOrder: 1 },
      { id: 2, imagePath: "/images/resources/food-distribution-2.jpg", altText: "Students receiving meals", caption: null, sortOrder: 2 },
      { id: 3, imagePath: "/images/resources/food-distribution-3.jpg", altText: "Meal preparation", caption: null, sortOrder: 3 },
      { id: 4, imagePath: "/images/resources/food-distribution-4.jpg", altText: "Campus kitchen", caption: null, sortOrder: 4 },
      { id: 5, imagePath: "/images/resources/food-distribution-5.jpg", altText: "Community gathering", caption: null, sortOrder: 5 },
    ],
  },
];

export const galleryRouter = router({
  list: publicProcedure.query(() => galleries),
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => galleries.find((g) => g.slug === input.slug) ?? null),
});
