import { getLatestYouTubeVideos } from "@/lib/youtube";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { VideoCard } from "@/components/VideoCard";

export async function YouTubeFeed() {
  const all = await getLatestYouTubeVideos(12);
  const videos = all.filter((v) => !v.isShort);

  return (
    <section className="bg-[#0A1118] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">

        {/* ── Regular Videos ── */}
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#D4A853]">Watch</p>
              <h2 className="font-heading mt-2 text-4xl font-black text-white md:text-5xl">
                Latest from our channel
              </h2>
            </div>
            <a
              href="https://www.youtube.com/@WFMCA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white/70 transition-all hover:border-[#D4A853]/50 hover:text-[#D4A853]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
              </svg>
              Subscribe on YouTube
            </a>
          </div>
        </FadeIn>

        {videos.length > 0 && (
          <StaggerContainer
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.08}
          >
            {videos.map((video, i) => (
              <StaggerItem key={video.id}>
                <VideoCard video={video} isLatest={i === 0} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {/* Bottom link */}
        <FadeIn>
          <div className="mt-12 text-center">
            <a
              href="https://www.youtube.com/@WFMCA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/40 transition-colors hover:text-[#D4A853]"
            >
              View all videos on YouTube
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
