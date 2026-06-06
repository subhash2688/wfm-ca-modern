import { z } from "zod";
import { router, publicProcedure } from "@/lib/trpc/init";

const stories = [
  { id: 1, title: "How WFM Helped Me Focus on My Studies", slug: "how-wfm-helped-me-focus-on-studies", excerpt: "As a first-generation student working two jobs, finding time to eat was a luxury I couldn't always afford.", imagePath: "/images/testimonials/testimonial1.jpg", authorName: "Priya S., UC Davis", publishDate: new Date("2026-03-01"), content: "<p>As a first-generation student working two jobs, finding time to eat was a luxury I couldn't always afford. WFM changed that.</p>" },
  { id: 2, title: "From Volunteer to Chapter Lead in One Year", slug: "from-volunteer-to-chapter-lead-one-year", excerpt: "I started by delivering meals on Saturday mornings. A year later, I'm running our entire campus chapter.", imagePath: "/images/testimonials/testimonial2.jpg", authorName: "Marcus T., UT Austin", publishDate: new Date("2026-01-15"), content: "<p>I started by delivering meals on Saturday mornings with no idea how much it would change my life. A year later, I'm running our entire campus chapter.</p>" },
];

export const storyRouter = router({
  list: publicProcedure.query(() => stories),
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => stories.find((s) => s.slug === input.slug) ?? null),
});
