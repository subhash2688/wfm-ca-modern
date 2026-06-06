import { router, publicProcedure } from "@/lib/trpc/init";

const faqs = [
  { id: 1, question: "Who is eligible to receive free meals?", answer: "Any currently enrolled college student at a participating campus is eligible. There is no income requirement or application process — just show up.", sortOrder: 1, category: "For Students" },
  { id: 2, question: "How do I sign up to receive meals?", answer: "Visit your campus chapter's sign-up page or speak to a volunteer at any of our distribution points. Registration takes less than 2 minutes.", sortOrder: 2, category: "For Students" },
  { id: 3, question: "What kind of food do you serve?", answer: "We serve fresh, vegetarian meals inspired by sattvic nutrition principles — wholesome, nourishing, and prepared with care.", sortOrder: 3, category: "For Students" },
  { id: 4, question: "How can I volunteer?", answer: "Visit our Get Involved page to find your nearest chapter and sign up. We welcome volunteers for meal prep, delivery, and campus outreach.", sortOrder: 4, category: "Volunteering" },
  { id: 5, question: "Is my donation tax-deductible?", answer: "Yes. The World Food Movement is a registered 501(c)(3) nonprofit. All donations are tax-deductible to the extent permitted by law.", sortOrder: 5, category: "Donations" },
  { id: 6, question: "How is my donation used?", answer: "100% of donations fund meals and direct program costs. Our operations are supported separately through grants and institutional partnerships.", sortOrder: 6, category: "Donations" },
];

export const faqRouter = router({
  list: publicProcedure.query(() => faqs),
});
