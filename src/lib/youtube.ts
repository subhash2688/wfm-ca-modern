const CHANNEL_ID = "UC2dCF3NcVngnXpk-ha_OTcA";

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
}

const FALLBACK_VIDEOS: YouTubeVideo[] = [
  {
    id: "7NLmjWjIpB8",
    title: "A Milestone of Care: 15,000 Meals Served",
    description: "Celebrating a milestone in our mission to end student hunger across Bay Area campuses.",
    thumbnail: `https://i.ytimg.com/vi/7NLmjWjIpB8/hqdefault.jpg`,
    publishedAt: "2025-11-01",
    url: "https://www.youtube.com/watch?v=7NLmjWjIpB8",
  },
  {
    id: "jtfc82XdCn4",
    title: "When students speak, we listen",
    description: "Students share how the World Food Movement has changed their experience on campus.",
    thumbnail: `https://i.ytimg.com/vi/jtfc82XdCn4/hqdefault.jpg`,
    publishedAt: "2025-09-01",
    url: "https://www.youtube.com/watch?v=jtfc82XdCn4",
  },
  {
    id: "S80G83BsybQ",
    title: "Leadership in action — Chabot College",
    description: "WFM expands to Chabot College in Hayward, bringing free hot meals to hundreds more students.",
    thumbnail: `https://i.ytimg.com/vi/S80G83BsybQ/hqdefault.jpg`,
    publishedAt: "2025-07-01",
    url: "https://www.youtube.com/watch?v=S80G83BsybQ",
  },
];

export async function getLatestYouTubeVideos(maxResults = 6): Promise<YouTubeVideo[]> {
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
    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    if (!videosRes.ok) return FALLBACK_VIDEOS;

    const videosData = await videosRes.json();

    return (videosData.items ?? []).map((item: {
      snippet: {
        resourceId: { videoId: string };
        title: string;
        description: string;
        thumbnails: { high?: { url: string }; medium?: { url: string } };
        publishedAt: string;
      };
    }) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail:
        item.snippet.thumbnails.high?.url ??
        item.snippet.thumbnails.medium?.url ??
        `https://i.ytimg.com/vi/${item.snippet.resourceId.videoId}/hqdefault.jpg`,
      publishedAt: item.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
    }));
  } catch {
    return FALLBACK_VIDEOS;
  }
}
