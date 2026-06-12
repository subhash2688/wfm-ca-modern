import { fetchLinkedInPosts } from "@/lib/linkedin";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 11.01-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function truncate(s: string, max = 180): string {
  if (s.length <= max) return s;
  return s.slice(0, max).trimEnd() + "…";
}

export default async function LinkedInFeed() {
  const posts = await fetchLinkedInPosts(6);

  if (posts.length === 0) return null;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="font-heading text-3xl font-bold text-[#1A1A1A] md:text-4xl">
              From LinkedIn.
            </h2>
            <a
              href="https://www.linkedin.com/company/wfmca/posts/?feedView=all"
              target="_blank"
              rel="noreferrer noopener"
              className="hidden items-center gap-1.5 text-sm font-medium text-[#0A66C2] transition-colors hover:text-[#084d94] sm:inline-flex"
            >
              <LinkedInIcon className="h-3.5 w-3.5" />
              Follow
            </a>
          </div>
        </FadeIn>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.link}>
              <a
                href={post.link}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E2DD] bg-white transition-all hover:border-[#0A66C2]/30 hover:shadow-md"
              >
                {post.imageUrl ? (
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.imageUrl}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[16/10] items-center justify-center bg-[#0A66C2]/5">
                    <LinkedInIcon className="h-10 w-10 text-[#0A66C2]/30" />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <time className="text-xs text-[#6B7280]">
                    {post.pubDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#374151] line-clamp-5">
                    {truncate(post.description || post.title)}
                  </p>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
