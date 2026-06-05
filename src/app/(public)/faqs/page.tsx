import type { Metadata } from "next";
import { serverTRPC } from "@/lib/trpc/server";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn } from "@/components/ui/motion";
import { FaqAccordion } from "./FaqAccordion";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Frequently asked questions about the World Food Movement, donations, volunteering, and more.",
};

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string | null;
  sortOrder: number;
}

export default async function FaqsPage() {
  const trpc = await serverTRPC();
  const faqs = await trpc.faq.list();

  // Group FAQs by category
  const grouped = faqs.reduce<Record<string, FaqItem[]>>((acc, faq) => {
    const category = faq.category || "General";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <main>
      <PageHero label="FAQs" title="Questions answered." />

      <section className="bg-[#FAFAF8] py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          {faqs.length === 0 ? (
            <FadeIn>
              <div className="py-20 text-center">
                <p className="text-lg text-[#6B7280]">
                  No FAQs available yet. Check back soon.
                </p>
              </div>
            </FadeIn>
          ) : (
            <div className="space-y-12">
              {categories.map((category) => (
                <FadeIn key={category}>
                  <div>
                    {categories.length > 1 && (
                      <h2 className="font-heading mb-6 text-2xl font-bold text-[#1A1A1A]">
                        {category}
                      </h2>
                    )}
                    <FaqAccordion items={grouped[category]} />
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
