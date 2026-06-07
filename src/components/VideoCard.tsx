"use client";

import { useState } from "react";
import Image from "next/image";
import type { YouTubeVideo } from "@/lib/youtube";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function VideoCard({ video, isLatest }: { video: YouTubeVideo; isLatest?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const embedUrl = video.isShort
    ? `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`
    : `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:border-[#D4A853]/40 hover:bg-white/[0.07]">
      {/* Video / Thumbnail */}
      <div className={`relative overflow-hidden bg-black ${video.isShort ? "aspect-[9/16]" : "aspect-video"}`}>
        {playing ? (
          <iframe
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853]"
            aria-label={`Play ${video.title}`}
          >
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-[#0A1118]/30" />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-200 group-hover:scale-110">
                <svg className="ml-1 h-6 w-6 text-[#1A3D5C]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            {isLatest && (
              <div className="absolute left-3 top-3 rounded-full bg-[#D4A853] px-2.5 py-0.5 text-xs font-bold text-[#1A3D5C]">
                Latest
              </div>
            )}
          </button>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-white/35">{formatDate(video.publishedAt)}</p>
        <h3 className="mt-1.5 text-sm font-semibold leading-snug text-white/85 line-clamp-2">
          {video.title}
        </h3>
        {!video.isShort && video.description && (
          <p className="mt-1.5 text-xs leading-relaxed text-white/35 line-clamp-2">
            {video.description}
          </p>
        )}
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-xs text-white/25 transition-colors hover:text-[#D4A853]"
        >
          {video.isShort ? "Watch Short on YouTube" : "Watch on YouTube"}
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
