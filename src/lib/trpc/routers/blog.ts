import { z } from "zod";
import { router, publicProcedure } from "@/lib/trpc/init";

const blogs = [
  { id: 1, title: "How Free Meals Are Changing Lives on Campus", slug: "how-free-meals-are-changing-lives", shortDesc: "Discover the impact of our meal program on student academic performance and mental health.", imagePath: "/images/resources/food-image-home.webp", category: "Impact", publishDate: new Date("2026-04-15"), metaTitle: null, metaDescription: null, content: "<p>Food insecurity affects nearly 1 in 3 college students. Our campus meal program has served over 50,000 meals this academic year alone.</p>" },
  { id: 2, title: "Why Plant-Based Meals Help Students Study Better", slug: "why-plant-based-meals-help-students-study-better", shortDesc: "The science behind why freshly cooked, plant-based food improves focus, energy, and academic performance.", imagePath: "/images/resources/food-serving.webp", category: "Nutrition", publishDate: new Date("2026-03-22"), metaTitle: null, metaDescription: null, content: "<p>At the heart of every meal we serve is a simple principle: food should nourish both body and mind. Our kitchens prepare fresh, plant-based meals daily using wholesome, locally sourced ingredients.</p>" },
  { id: 3, title: "Volunteer Spotlight: The People Behind the Meals", slug: "volunteer-spotlight-people-behind-the-meals", shortDesc: "Meet a few of the incredible volunteers who make our program possible.", imagePath: "/images/resources/food-distribution-1.jpg", category: "Community", publishDate: new Date("2026-02-10"), metaTitle: null, metaDescription: null, content: "<p>Behind every meal delivery is a volunteer who showed up because they believe no student should go hungry.</p>" },
];

export const blogRouter = router({
  list: publicProcedure.query(() => blogs.map(({ content: _c, ...b }) => b)),
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => blogs.find((b) => b.slug === input.slug) ?? null),
});
