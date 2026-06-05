import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { serverTRPC } from "@/lib/trpc/server";
import { FadeIn } from "@/components/ui/motion";

interface NewsDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: NewsDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const trpc = await serverTRPC();
  const article = await trpc.news.getBySlug({ slug });

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.shortDesc || undefined,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const { slug } = await params;
  const trpc = await serverTRPC();
  const article = await trpc.news.getBySlug({ slug });

  if (!article) {
    notFound();
  }

  return (
    <main>
      {/* Hero image */}
      {article.imagePath && (
        <div className="relative h-[40vh] min-h-[320px] md:h-[50vh]">
          <Image
            src={article.imagePath}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A3D5C]/80 via-[#1A3D5C]/30 to-transparent" />
        </div>
      )}

      <section className="bg-[#FAFAF8] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#1A3D5C]"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Back to News
            </Link>

            <time className="mt-8 block text-sm font-medium text-[#D4A853]">
              {new Date(article.publishDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>

            <h1 className="font-heading mt-3 text-3xl font-bold text-[#1A1A1A] md:text-5xl">
              {article.title}
            </h1>

            {article.shortDesc && (
              <p className="mt-6 text-lg leading-relaxed text-[#4B5563]">
                {article.shortDesc}
              </p>
            )}

            {article.content && (
              <div
                dangerouslySetInnerHTML={{ __html: article.content }}
                className="prose prose-lg mt-10 max-w-none prose-headings:font-heading prose-headings:text-[#1A1A1A] prose-p:text-[#4B5563] prose-a:text-[#D4A853] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
              />
            )}
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
