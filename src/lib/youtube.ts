const CHANNEL_ID = "UC2dCF3NcVngnXpk-ha_OTcA";

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
  isShort: boolean;
}

const FALLBACK_VIDEOS: YouTubeVideo[] = [
  {
    id: "7NLmjWjIpB8",
    title: "A Milestone of Care: 15,000 Meals Served",
    description: "Celebrating a milestone in our mission to end student hunger across Bay Area campuses.",
    thumbnail: `https://i.ytimg.com/vi/7NLmjWjIpB8/hqdefault.jpg`,
    publishedAt: "2025-11-01",
    url: "https://www.youtube.com/watch?v=7NLmjWjIpB8",
    isShort: false,
  },
  {
    id: "jtfc82XdCn4",
    title: "When students speak, we listen",
    description: "Students share how the World Food Movement has changed their experience on campus.",
    thumbnail: `https://i.ytimg.com/vi/jtfc82XdCn4/hqdefault.jpg`,
    publishedAt: "2025-09-01",
    url: "https://www.youtube.com/watch?v=jtfc82XdCn4",
    isShort: false,
  },
  {
    id: "S80G83BsybQ",
    title: "Leadership in action — Chabot College",
    description: "WFM expands to Chabot College in Hayward, bringing free hot meals to hundreds more students.",
    thumbnail: `https://i.ytimg.com/vi/S80G83BsybQ/hqdefault.jpg`,
    publishedAt: "2025-07-01",
    url: "https://www.youtube.com/watch?v=S80G83BsybQ",
    isShort: false,
  },
  // Shorts — replace IDs with real WFMCA short video IDs
  {
    id: "7NLmjWjIpB8",
    title: "Meal prep day at Berkeley",
    description: "",
    thumbnail: `https://i.ytimg.com/vi/7NLmjWjIpB8/hqdefault.jpg`,
    publishedAt: "2025-10-15",
    url: "https://www.youtube.com/shorts/7NLmjWjIpB8",
    isShort: true,
  },
  {
    id: "jtfc82XdCn4",
    title: "60 seconds of gratitude",
    description: "",
    thumbnail: `https://i.ytimg.com/vi/jtfc82XdCn4/hqdefault.jpg`,
    publishedAt: "2025-08-20",
    url: "https://www.youtube.com/shorts/jtfc82XdCn4",
    isShort: true,
  },
  {
    id: "S80G83BsybQ",
    title: "First day at Chabot",
    description: "",
    thumbnail: `https://i.ytimg.com/vi/S80G83BsybQ/hqdefault.jpg`,
    publishedAt: "2025-06-10",
    url: "https://www.youtube.com/shorts/S80G83BsybQ",
    isShort: true,
  },
];

function parseDurationSeconds(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const [, h, m, s] = match;
  return (parseInt(h ?? "0") * 3600) + (parseInt(m ?? "0") * 60) + parseInt(s ?? "0");
}

export async function getLatestYouTubeVideos(maxResults = 12): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return FALLBACK_VIDEOS;

  try {
    // Get the uploads playlist ID from the channel
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    if (!channelRes.ok) return FALLBACK_VIDEOS;

    const channelData = await channelRes.json();
    const uploadsPlaylistId =
      channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) return FALLBACK_VIDEOS;

    // Get latest videos from uploads playlist
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    if (!playlistRes.ok) return FALLBACK_VIDEOS;

    const playlistData = await playlistRes.json();
    const items: Array<{
      snippet: {
        resourceId: { videoId: string };
        title: string;
        description: string;
        thumbnails: { high?: { url: string }; medium?: { url: string } };
        publishedAt: string;
      };
    }> = playlistData.items ?? [];

    if (items.length === 0) return FALLBACK_VIDEOS;

    // Batch fetch durations to detect Shorts (≤ 60 s)
    const videoIds = items.map((i) => i.snippet.resourceId.videoId).join(",");
    const detailsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );

    const durationMap: Record<string, number> = {};
    if (detailsRes.ok) {
      const detailsData = await detailsRes.json();
      for (const v of detailsData.items ?? []) {
        durationMap[v.id] = parseDurationSeconds(v.contentDetails.duration);
      }
    }

    return items.map((item) => {
      const videoId = item.snippet.resourceId.videoId;
      const duration = durationMap[videoId] ?? 999;
      const isShort = duration <= 60;
      return {
        id: videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail:
          item.snippet.thumbnails.high?.url ??
          item.snippet.thumbnails.medium?.url ??
          `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        publishedAt: item.snippet.publishedAt,
        url: isShort
          ? `https://www.youtube.com/shorts/${videoId}`
          : `https://www.youtube.com/watch?v=${videoId}`,
        isShort,
      };
    });
  } catch {
    return FALLBACK_VIDEOS;
  }
}
