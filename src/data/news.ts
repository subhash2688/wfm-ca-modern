export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  shortDesc: string;
  content: string;
  imagePath: string;
  publishDate: Date;
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "WFM Expands to 10 New Campuses in Spring 2026",
    slug: "wfm-expands-to-10-new-campuses-spring-2026",
    shortDesc: "The World Food Movement is proud to announce expansion to 10 additional college campuses this spring semester.",
    content: `<p>Following a successful fundraising campaign, the World Food Movement will launch meal programs at 10 new campuses across California, Texas, and New York beginning in January 2026. This expansion will bring free, nutritious meals to an additional 2,000 students per week.</p>`,
    imagePath: "/images/resources/how-it-works-home1.webp",
    publishDate: new Date("2026-01-08"),
  },
  {
    id: 2,
    title: "WFM Receives $250,000 Grant from the Nourish Foundation",
    slug: "wfm-receives-250000-grant-nourish-foundation",
    shortDesc: "A landmark grant will fund two years of operations and allow us to reach more students than ever before.",
    content: `<p>We are thrilled to announce that the World Food Movement has received a $250,000 grant from the Nourish Foundation. This funding will support meal program operations across all campuses for the next two academic years and fund our volunteer training initiative.</p>`,
    imagePath: "/images/resources/mission-vision-side-img.webp",
    publishDate: new Date("2025-11-20"),
  },
];
