import { z } from "zod";
import { router, publicProcedure } from "@/lib/trpc/init";

const news = [
  { id: 1, title: "WFM Expands to 10 New Campuses in Spring 2026", slug: "wfm-expands-10-new-campuses-spring-2026", shortDesc: "The World Food Movement announces expansion to 10 additional college campuses this spring semester.", imagePath: "/images/resources/how-it-works-home1.webp", publishDate: new Date("2026-01-08"), metaTitle: null, metaDescription: null, content: "<p>Following a successful fundraising campaign, WFM will launch meal programs at 10 new campuses across California, Texas, and New York.</p>" },
  { id: 2, title: "WFM Receives $250,000 Grant from the Nourish Foundation", slug: "wfm-receives-250000-grant-nourish-foundation", shortDesc: "A landmark grant will fund two years of operations and allow us to reach more students than ever before.", imagePath: "/images/resources/mission-vision-side-img.webp", publishDate: new Date("2025-11-20"), metaTitle: null, metaDescription: null, content: "<p>We are thrilled to announce a $250,000 grant from the Nourish Foundation, supporting operations for the next two academic years.</p>" },
];

export const newsRouter = router({
  list: publicProcedure.query(() => news.map(({ content: _c, ...n }) => n)),
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => news.find((n) => n.slug === input.slug) ?? null),
});
