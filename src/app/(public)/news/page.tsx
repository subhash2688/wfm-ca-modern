import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { serverTRPC } from "@/lib/trpc/server";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "Stay up to date with the latest news and updates from the World Food Movement.",
};

export default async function NewsPage() {
  const trpc = await serverTRPC();
  const newsItems = await trpc.news.list();

  return (
    <main>
      <PageHero label="Updates" title="Latest news." />

      <section className="bg-[#FAFAF8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          {newsItems.length === 0 ? (
            <FadeIn>
              <div className="py-20 text-center">
                <p className="text-lg text-[#6B7280]">
                  No news articles yet. Check back soon for updates.
                </p>
              </div>
            </FadeIn>
          ) : (
            <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {newsItems.map((item) => (
                <StaggerItem key={item.id}>
                  <Link
                    href={`/news/${item.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E2DD] bg-white transition-all hover:border-[#D4A853]/40 hover:shadow-lg"
                  >
                    {item.imagePath ? (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={item.imagePath}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[16/10] items-center justify-center bg-[#1A3D5C]/5">
                        <svg
                          className="h-12 w-12 text-[#1A3D5C]/20"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <time className="text-sm font-medium text-[#D4A853]">
                        {new Date(item.publishDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </time>
                      <h2 className="font-heading mt-2 text-xl font-bold text-[#1A1A1A] group-hover:text-[#1A3D5C]">
                        {item.title}
                      </h2>
                      {item.shortDesc && (
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4B5563]">
                          {item.shortDesc}
                        </p>
                      )}
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D4A853] transition-colors group-hover:text-[#C49A48]">
                        Read more
                        <svg
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>
    </main>
  );
}
