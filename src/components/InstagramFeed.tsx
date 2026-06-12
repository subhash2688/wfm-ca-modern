import { fetchInstagramPosts } from "@/lib/instagram";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default async function InstagramFeed() {
  const posts = await fetchInstagramPosts(9);

  if (posts.length === 0) return null;

  return (
    <section className="bg-[#FAFAF8] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="font-heading text-3xl font-bold text-[#1A1A1A] md:text-4xl">
              From the field.
            </h2>
            <a
              href="https://www.instagram.com/wfmca/"
              target="_blank"
              rel="noreferrer noopener"
              className="hidden items-center gap-1.5 text-sm font-medium text-[#1A1A1A] transition-opacity hover:opacity-70 sm:inline-flex"
            >
              <InstagramIcon className="h-4 w-4" />
              @wfmca
            </a>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.link}>
              <a
                href={post.link}
                target="_blank"
                rel="noreferrer noopener"
                className="group relative block aspect-square overflow-hidden rounded-lg bg-stone-100"
                aria-label={post.title || "Instagram post"}
              >
                {post.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.imageUrl}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <InstagramIcon className="h-8 w-8 text-stone-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />
                <InstagramIcon className="absolute right-3 top-3 h-4 w-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
