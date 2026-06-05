import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { serverTRPC } from "@/lib/trpc/server";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Real stories of students whose lives have been changed by the World Food Movement.",
};

export default async function StoriesPage() {
  const trpc = await serverTRPC();
  const stories = await trpc.story.list();

  return (
    <main>
      <PageHero label="Stories" title="Real lives, real impact." />

      <section className="bg-[#FAFAF8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          {stories.length === 0 ? (
            <FadeIn>
              <div className="py-20 text-center">
                <p className="text-lg text-[#6B7280]">
                  No stories published yet. Check back soon to hear from our
                  community.
                </p>
              </div>
            </FadeIn>
          ) : (
            <StaggerContainer className="grid gap-8 md:grid-cols-2">
              {stories.map((story) => (
                <StaggerItem key={story.id}>
                  <Link
                    href={`/stories/${story.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E2DD] bg-white transition-all hover:border-[#D4A853]/40 hover:shadow-lg"
                  >
                    {story.imagePath ? (
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={story.imagePath}
                          alt={story.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[16/9] items-center justify-center bg-[#1A3D5C]/5">
                        <svg
                          className="h-16 w-16 text-[#1A3D5C]/20"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-8">
                      <time className="text-sm font-medium text-[#D4A853]">
                        {new Date(story.publishDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </time>
                      <h2 className="font-heading mt-2 text-2xl font-bold text-[#1A1A1A] group-hover:text-[#1A3D5C]">
                        {story.title}
                      </h2>
                      {story.authorName && (
                        <p className="mt-2 text-sm font-medium text-[#1A3D5C]">
                          By {story.authorName}
                        </p>
                      )}
                      {story.excerpt && (
                        <p className="mt-4 flex-1 leading-relaxed text-[#4B5563]">
                          {story.excerpt}
                        </p>
                      )}
                      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D4A853] transition-colors group-hover:text-[#C49A48]">
                        Read their story
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
