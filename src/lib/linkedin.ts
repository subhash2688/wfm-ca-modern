import { fetchRssFeed, type FeedItem } from "./rss";

const FEED_URL =
  process.env.LINKEDIN_RSS_URL ??
  "https://rss.app/feeds/umi6m85bZ3xVfrsW.xml";

export type LinkedInPost = FeedItem;

export async function fetchLinkedInPosts(limit = 6): Promise<LinkedInPost[]> {
  return fetchRssFeed(FEED_URL, limit);
}
