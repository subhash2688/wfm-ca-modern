import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { serverTRPC } from "@/lib/trpc/server";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "The latest milestones, campus launches, and impact news from the World Food Movement.",
};

const categoryColors: Record<string, string> = {
  Milestone: "bg-[#D4A853]/15 text-[#1A3D5C]",
  Expansion: "bg-[#1A3D5C]/10 text-[#1A3D5C]",
  "Campus News": "bg-emerald-50 text-emerald-700",
  Event: "bg-purple-50 text-purple-700",
};

export default async function NewsPage() {
  const trpc = await serverTRPC();
  const newsItems = await trpc.news.list();

  const [featured, ...rest] = newsItems;

  return (
    <main>
      <PageHero
        label="Updates"
        title="What's happening."
        subtitle="Milestones, new campuses, and stories from the movement — updated as we grow."
      />

      {featured && (
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#D4A853]">
                Latest
              </p>
            </FadeIn>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <FadeInLeft>
                <Link href={`/news/${featured.slug}`} className="group block overflow-hidden rounded-2xl">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                    {featured.imagePath ? (
                      <Image
                        src={featured.imagePath}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-[#1A3D5C]/5" />
                    )}
                  </div>
                </Link>
              </FadeInLeft>
              <FadeInRight>
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${(featured.category ? categoryColors[featured.category] : null) ?? "bg-gray-100 text-gray-600"}`}>
                  {featured.category}
                </span>
                <Link href={`/news/${featured.slug}`} className="group">
                  <h2 className="font-heading mt-4 text-3xl font-bold leading-snug text-[#1A1A1A] transition-colors group-hover:text-[#1A3D5C] md:text-4xl">
                    {featured.title}
                  </h2>
                </Link>
                <p className="mt-4 text-lg leading-relaxed text-[#4B5563]">
                  {featured.shortDesc}
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <time className="text-sm text-[#6B7280]">
                    {new Date(featured.publishDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <Link
                  href={`/news/${featured.slug}`}
                  className="group/cta mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#D4A853] transition-colors hover:text-[#C49A48]"
                >
                  Read the full update
                  <svg className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </FadeInRight>
            </div>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="bg-[#FAFAF8] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <div className="mb-10 border-b border-[#E5E2DD] pb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7280]">
                  More updates
                </p>
              </div>
            </FadeIn>
            <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((item) => (
                <StaggerItem key={item.id}>
                  <Link
                    href={`/news/${item.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E2DD] bg-white transition-all hover:border-[#D4A853]/40 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {item.imagePath ? (
                        <Image
                          src={item.imagePath}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[#1A3D5C]/5">
                          <svg className="h-10 w-10 text-[#1A3D5C]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${(item.category ? categoryColors[item.category] : null) ?? "bg-gray-100 text-gray-600"}`}>
                          {item.category}
                        </span>
                        <time className="text-xs text-[#6B7280]">
                          {new Date(item.publishDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                      <h2 className="font-heading mt-3 text-lg font-bold leading-snug text-[#1A1A1A] transition-colors group-hover:text-[#1A3D5C]">
                        {item.title}
                      </h2>
                      {item.shortDesc && (
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#4B5563]">
                          {item.shortDesc}
                        </p>
                      )}
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D4A853] transition-colors group-hover:text-[#C49A48]">
                        Read more
                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#1A3D5C] py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              Be part of the next milestone.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
              Every $8 donation is a meal served. Every campus added is hundreds
              more students fed. Your support writes the next update.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 rounded-full bg-[#D4A853] px-10 py-4 text-base font-bold text-[#1A3D5C] transition-all hover:bg-[#C49A48] hover:shadow-xl"
              >
                Fund a meal
              </Link>
              <Link
                href="/get-involved"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-10 py-4 text-base font-medium text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                Get involved
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
