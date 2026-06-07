"use client";

import { useRef } from "react";
import { VideoCard } from "@/components/VideoCard";
import type { YouTubeVideo } from "@/lib/youtube";

export function ShortsRow({ shorts }: { shorts: YouTubeVideo[] }) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 260 : -260, behavior: "smooth" });
  };

  if (shorts.length === 0) return null;

  return (
    <div className="relative">
      {/* Scroll buttons — only visible on larger screens */}
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0A1118]/80 p-2 text-white/50 backdrop-blur transition hover:border-[#D4A853]/40 hover:text-[#D4A853] lg:flex"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0A1118]/80 p-2 text-white/50 backdrop-blur transition hover:border-[#D4A853]/40 hover:text-[#D4A853] lg:flex"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Scrollable row */}
      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
      >
        {shorts.map((short, i) => (
          <div
            key={short.id + i}
            className="w-[220px] flex-none snap-start"
          >
            <VideoCard video={short} isLatest={i === 0} />
          </div>
        ))}
      </div>
    </div>
  );
}
