import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { serverTRPC } from "@/lib/trpc/server";
import { FadeIn } from "@/components/ui/motion";

interface StoryDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: StoryDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const trpc = await serverTRPC();
  const story = await trpc.story.getBySlug({ slug });

  if (!story) {
    return { title: "Story Not Found" };
  }

  return {
    title: story.title,
    description: story.excerpt || undefined,
    openGraph: {
      title: story.title,
      description: story.excerpt || undefined,
      images: story.imagePath ? [story.imagePath] : [],
    },
  };
}

export default async function StoryDetailPage({ params }: StoryDetailProps) {
  const { slug } = await params;
  const trpc = await serverTRPC();
  const story = await trpc.story.getBySlug({ slug });

  if (!story) {
    notFound();
  }

  const publishedDate = new Date(story.publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main>
      {/* ── Hero ── */}
      {story.imagePath ? (
        <div className="relative h-[50vh] min-h-[380px] md:h-[60vh]">
          <Image
            src={story.imagePath}
            alt={story.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A24]/90 via-[#1A3D5C]/40 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-3xl px-6 pb-12">
              <p className="text-sm font-semibold text-[#D4A853]">
                {publishedDate}
              </p>
              <h1 className="font-heading mt-3 text-3xl font-bold text-white md:text-5xl">
                {story.title}
              </h1>
              {story.authorName && (
                <p className="mt-3 text-base text-white/60">
                  By {story.authorName}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Fallback hero when no image */
        <div className="relative bg-[#1A3D5C] pb-16 pt-32 md:pt-40">
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #D4A853 0%, transparent 60%)" }}
          />
          <div className="relative mx-auto max-w-3xl px-6">
            <p className="text-sm font-semibold text-[#D4A853]">
              {publishedDate}
            </p>
            <h1 className="font-heading mt-4 text-3xl font-bold text-white md:text-6xl">
              {story.title}
            </h1>
            {story.authorName && (
              <p className="mt-4 text-base text-white/50">
                By {story.authorName}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Article body ── */}
      <section className="bg-[#FAFAF8] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#1A3D5C]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to Stories
            </Link>

            {/* Excerpt pull-quote */}
            {story.excerpt && (
              <blockquote className="mt-10 border-l-4 border-[#D4A853] pl-6">
                <p className="text-xl font-medium leading-relaxed italic text-[#1A3D5C] md:text-2xl">
                  &ldquo;{story.excerpt}&rdquo;
                </p>
              </blockquote>
            )}

            {/* Content */}
            {story.content && (
              <div
                dangerouslySetInnerHTML={{ __html: story.content }}
                className="prose prose-lg mt-10 max-w-none prose-headings:font-heading prose-headings:text-[#1A1A1A] prose-p:leading-relaxed prose-p:text-[#4B5563] prose-a:text-[#D4A853] prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-blockquote:border-[#D4A853] prose-blockquote:text-[#4B5563]"
              />
            )}

            {/* Author card */}
            {story.authorName && (
              <div className="mt-14 flex items-center gap-4 rounded-2xl border border-[#E5E2DD] bg-white p-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#1A3D5C] font-heading text-lg font-bold text-white">
                  {story.authorName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-[#1A1A1A]">{story.authorName}</p>
                  <p className="text-sm text-[#6B7280]">WFMCA Community</p>
                </div>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* ── Donate CTA ── */}
      <section className="relative py-24 md:py-32">
        <Image
          src="/images/banners/hero-3.webp"
          alt="Students receiving meals"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0F1A24]/80" />
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <FadeIn>
            <svg className="mx-auto h-10 w-10 text-[#D4A853]/40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <h2 className="font-heading mt-6 text-3xl font-bold text-white md:text-4xl">
              Every $8 funds one freshly prepared meal for a student in need.
            </h2>
            <p className="mt-4 text-lg text-white/60">
              Stories like this one are made possible by donors like you.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/donate"
                className="inline-flex items-center gap-3 rounded-full bg-[#D4A853] px-10 py-4 text-base font-bold text-[#1A3D5C] transition-all hover:bg-[#C49A48] hover:shadow-xl hover:shadow-[#D4A853]/20"
              >
                Fund meals today
              </Link>
              <Link
                href="/stories"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-medium text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                Read more stories
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
