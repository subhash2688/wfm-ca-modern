import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { serverTRPC } from "@/lib/trpc/server";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stories, insights, and perspectives from the World Food Movement community.",
};

export default async function BlogsPage() {
  const trpc = await serverTRPC();
  const blogPosts = await trpc.blog.list();

  return (
    <main>
      <PageHero label="Blog" title="Stories & insights." />

      <section className="bg-[#FAFAF8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          {blogPosts.length === 0 ? (
            <FadeIn>
              <div className="py-20 text-center">
                <p className="text-lg text-[#6B7280]">
                  No blog posts yet. Check back soon for stories and insights.
                </p>
              </div>
            </FadeIn>
          ) : (
            <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <StaggerItem key={post.id}>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E2DD] bg-white transition-all hover:border-[#D4A853]/40 hover:shadow-lg"
                  >
                    {post.imagePath ? (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={post.imagePath}
                          alt={post.title}
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
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3">
                        <time className="text-sm font-medium text-[#D4A853]">
                          {new Date(post.publishDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </time>
                        {post.category && (
                          <>
                            <span className="text-[#E5E2DD]">&bull;</span>
                            <span className="text-sm font-medium text-[#6B7280]">
                              {post.category}
                            </span>
                          </>
                        )}
                      </div>
                      <h2 className="font-heading mt-2 text-xl font-bold text-[#1A1A1A] group-hover:text-[#1A3D5C]">
                        {post.title}
                      </h2>
                      {post.shortDesc && (
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4B5563]">
                          {post.shortDesc}
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
