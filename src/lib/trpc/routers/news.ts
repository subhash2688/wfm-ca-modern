import { z } from "zod";
import { router, publicProcedure } from "@/lib/trpc/init";

const news = [
  {
    id: 1,
    title: "WFM Comes to New York: Meals Now Served at College of Staten Island",
    slug: "wfm-college-of-staten-island-new-york-2026",
    shortDesc: "In partnership with CSI Food Pantry, WFM served 100 free hot meals at the Campus Center Rotunda — marking our first foothold in New York City.",
    imagePath: "/images/resources/IMG_2881b.jpeg",
    category: "Expansion",
    publishDate: new Date("2026-05-07"),
    metaTitle: null,
    metaDescription: null,
    content: `<p>On May 7, 2026, the World Food Movement partnered with the CSI Food Pantry to serve 100 free hot meals at the College of Staten Island Campus Center Rotunda. The menu featured Lentil Risotto, Mexican Salad, and Elaichi Tutti-Frutti Cake — all freshly cooked and served on a first-come, first-served basis.</p><p>This marks WFM's first active presence in New York City, expanding our reach beyond the Bay Area and into the country's most populous metro. We're grateful to the Office of Student Life at CSI for making this partnership possible.</p>`,
  },
  {
    id: 2,
    title: "WFM Launches in Massachusetts at Middlesex Community College",
    slug: "wfm-launches-massachusetts-middlesex-community-college-2026",
    shortDesc: "Nearly 100 hot meals served daily in Lowell, MA — our first East Coast campus program, launched formally on April 21, 2026.",
    imagePath: "/images/resources/FS20251112TCWorldFoodMovementDeAnzaGFX100S00032.jpg",
    category: "Expansion",
    publishDate: new Date("2026-04-21"),
    metaTitle: null,
    metaDescription: null,
    content: `<p>The World Food Movement formally launched its Massachusetts initiative on April 21, 2026 at Middlesex Community College in Lowell — though meals had already been flowing since February 2026. The program now serves approximately 100 hot, plant-based meals four days per week, with a 99% delivery reliability rate.</p><p>"For many of our students, this is the only substantial nourishment they receive in a day," said Middlesex Community College President Phil Sisson at the launch event.</p><p>WFM Co-Founder Chanchalapathi Dasa attended the formal launch: "We are happy to have formally launched our feeding program here in Massachusetts for the benefit of students."</p><p>Nearly 1 in 3 community college students in Massachusetts experience food insecurity. This program is our commitment to changing that — one meal at a time.</p>`,
  },
  {
    id: 3,
    title: "Foothill College Joins WFM as Our Newest Bay Area Partner",
    slug: "foothill-college-joins-wfm-march-2026",
    shortDesc: "Los Altos Hills-based Foothill College is now a WFM partner campus, bringing free hot meals to thousands more Bay Area students.",
    imagePath: "/images/resources/IMG_2960.jpeg",
    category: "Campus News",
    publishDate: new Date("2026-03-02"),
    metaTitle: null,
    metaDescription: null,
    content: `<p>On March 2, 2026, Foothill College in Los Altos Hills officially joined the World Food Movement as a partner campus. Students at Foothill can now register through the WFM app and collect freshly cooked, plant-based meals at their campus distribution point — no paperwork, no income verification, no stigma.</p><p>Foothill joins De Anza, Chabot, Ohlone, Las Positas, West Valley, Evergreen Valley, and Mission College in our growing Bay Area network. We're proud to serve the Foothill community.</p>`,
  },
  {
    id: 4,
    title: "WFM Surpasses 20,000 Meals Served — and We're Just Getting Started",
    slug: "wfm-20000-meals-milestone-2026",
    shortDesc: "From 30 students at our De Anza launch to 20,000+ meals served across 8 campuses — a milestone worth celebrating, and a movement worth joining.",
    imagePath: "/images/resources/FS20251112TCWorldFoodMovementDeAnzaGFX100S00093.jpg",
    category: "Milestone",
    publishDate: new Date("2026-01-22"),
    metaTitle: null,
    metaDescription: null,
    content: `<p>One year ago, on January 22, 2025, we served our first meal at De Anza College. Thirty students showed up. By the end of that first week, hundreds had registered.</p><p>Today, we have served over 20,000 meals to more than 4,000 students across 8 Bay Area campuses. Every meal costs $8. Every dollar came from donors who believed no student should go hungry.</p><p>We are now in California, New Jersey, New York, and Massachusetts. Our goal: 1 million meals by 2030. We are 2% of the way there — and accelerating. Thank you for making this possible.</p>`,
  },
  {
    id: 5,
    title: "WFM Grand Launch: 200+ Leaders Gather to Fight Student Hunger",
    slug: "wfm-grand-launch-bay-area-march-2025",
    shortDesc: "On March 8, 2025, over 200 educators, officials, and community leaders gathered in the Bay Area to officially launch the World Food Movement in America.",
    imagePath: "/images/resources/IMG_2937.jpeg",
    category: "Event",
    publishDate: new Date("2025-03-08"),
    metaTitle: null,
    metaDescription: null,
    content: `<p>On March 8, 2025, the World Food Movement held its grand launch event in the Bay Area, bringing together over 200 guests — including college presidents, elected officials, business leaders, and community advocates — to mark the beginning of a new chapter in fighting student hunger in America.</p><p>Dr. Omar Torres, President of De Anza College, delivered a powerful keynote. Charles Sasaki, President of Ohlone College, led the official launch. Cupertino Mayor Liang Chao and Milpitas Vice Mayor Garry Barbadillo joined for the WFM logo unveiling.</p><p>"I cannot think of a more critical time in our nation's history where this support for our students is so pivotal," said Dr. Torres.</p><p>The event set the stage for rapid expansion across the Bay Area, with a stated goal of 50,000 meals in the first year and 1 million by 2030.</p>`,
  },
  {
    id: 6,
    title: "First Meal Served: WFM Launches at De Anza College, January 22, 2025",
    slug: "first-meal-de-anza-college-january-2025",
    shortDesc: "The movement started with 30 students and a simple idea: no student should go hungry. Here's how it began.",
    imagePath: "/images/resources/FullSize20250122TCSattvicMealsChelseaChangReleaseKickoff028572.jpg",
    category: "Milestone",
    publishDate: new Date("2025-01-22"),
    metaTitle: null,
    metaDescription: null,
    content: `<p>On January 22, 2025, the World Food Movement served its very first meal at De Anza College in Cupertino, California. It was a quiet start — 30 students, a small distribution table, and a big idea.</p><p>Within a week, hundreds of students had registered. Within a month, the program was operating across multiple days per week. By spring, WFM had expanded to additional Bay Area campuses.</p><p>47% of California community college students experience food insecurity. The first meal at De Anza was our answer to that statistic. Every meal since has been a step toward our goal of 1 million meals by 2030.</p>`,
  },
];

export const newsRouter = router({
  list: publicProcedure.query(() => news.map(({ content: _c, ...n }) => n)),
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => news.find((n) => n.slug === input.slug) ?? null),
});
