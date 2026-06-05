import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { serverTRPC } from "@/lib/trpc/server";
import { FadeIn } from "@/components/ui/motion";

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const trpc = await serverTRPC();
  const post = await trpc.blog.getBySlug({ slug });

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.shortDesc || undefined,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const trpc = await serverTRPC();
  const post = await trpc.blog.getBySlug({ slug });

  if (!post) {
    notFound();
  }

  return (
    <main>
      {/* Hero image */}
      {post.imagePath && (
        <div className="relative h-[40vh] min-h-[320px] md:h-[50vh]">
          <Image
            src={post.imagePath}
            alt={post.title}
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
              href="/blogs"
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
              Back to Blog
            </Link>

            <div className="mt-8 flex items-center gap-3">
              <time className="text-sm font-medium text-[#D4A853]">
                {new Date(post.publishDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {post.category && (
                <>
                  <span className="text-[#E5E2DD]">&bull;</span>
                  <span className="rounded-full bg-[#1A3D5C]/10 px-3 py-0.5 text-xs font-semibold text-[#1A3D5C]">
                    {post.category}
                  </span>
                </>
              )}
            </div>

            <h1 className="font-heading mt-3 text-3xl font-bold text-[#1A1A1A] md:text-5xl">
              {post.title}
            </h1>

            {post.shortDesc && (
              <p className="mt-6 text-lg leading-relaxed text-[#4B5563]">
                {post.shortDesc}
              </p>
            )}

            {post.content && (
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="prose prose-lg mt-10 max-w-none prose-headings:font-heading prose-headings:text-[#1A1A1A] prose-p:text-[#4B5563] prose-a:text-[#D4A853] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
              />
            )}
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
