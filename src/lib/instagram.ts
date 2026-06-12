import { fetchRssFeed, type FeedItem } from "./rss";

const FEED_URL =
  process.env.INSTAGRAM_RSS_URL ??
  "https://rss.app/feeds/FJfY9KuyQdVz9SXu.xml";

export type InstagramPost = FeedItem;

export async function fetchInstagramPosts(limit = 9): Promise<InstagramPost[]> {
  return fetchRssFeed(FEED_URL, limit);
}
