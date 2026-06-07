import { router } from "@/lib/trpc/init";
import { newsRouter } from "./news";
import { blogRouter } from "./blog";
import { storyRouter } from "./story";
import { eventRouter } from "./event";
import { galleryRouter } from "./gallery";
import { faqRouter } from "./faq";
import { testimonialRouter } from "./testimonial";
import { teamRouter } from "./team";
import { campaignRouter } from "./campaign";
import { collegeRouter } from "./college";
import { pageRouter } from "./page";
import { settingsRouter } from "./settings";

export const appRouter = router({
  news: newsRouter,
  blog: blogRouter,
  story: storyRouter,
  event: eventRouter,
  gallery: galleryRouter,
  faq: faqRouter,
  testimonial: testimonialRouter,
  team: teamRouter,
  campaign: campaignRouter,
  college: collegeRouter,
  page: pageRouter,
  settings: settingsRouter,
});

export type AppRouter = typeof appRouter;
