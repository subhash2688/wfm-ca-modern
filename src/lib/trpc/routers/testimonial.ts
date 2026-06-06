import { router, publicProcedure } from "@/lib/trpc/init";

const testimonials = [
  { id: 1, name: "Priya S.", role: "Student, UC Davis", content: "I was skipping meals to afford textbooks. WFM gave me back the ability to just eat without stress.", imagePath: "/images/testimonials/testimonial1.jpg", rating: 5, sortOrder: 1 },
  { id: 2, name: "Marcus T.", role: "Volunteer, UT Austin", content: "Volunteering with WFM has been one of the most meaningful things I've done in college.", imagePath: "/images/testimonials/testimonial2.jpg", rating: 5, sortOrder: 2 },
  { id: 3, name: "Jennifer K.", role: "Donor", content: "I donate because I know 100% of it goes to meals. No overhead games. Just food reaching students who need it.", imagePath: "/images/testimonials/testimonial3.jpg", rating: 5, sortOrder: 3 },
  { id: 4, name: "Raj N.", role: "Student, Stanford", content: "The meals aren't just food — they're community. Showing up to WFM is the one time a week I see people who genuinely care.", imagePath: "/images/testimonials/testimonial4.jpg", rating: 5, sortOrder: 4 },
];

export const testimonialRouter = router({
  list: publicProcedure.query(() => testimonials),
});
