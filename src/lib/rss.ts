import { XMLParser } from "fast-xml-parser";

export interface FeedItem {
  title: string;
  link: string;
  pubDate: Date;
  description: string;
  imageUrl: string | null;
}

interface RssItem {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
  "media:content"?: { "@_url"?: string } | { "@_url"?: string }[];
  enclosure?: { "@_url"?: string };
}

function extractImage(item: RssItem): string | null {
  const media = item["media:content"];
  if (Array.isArray(media)) {
    const first = media.find((m) => m["@_url"]);
    if (first?.["@_url"]) return first["@_url"];
  } else if (media?.["@_url"]) {
    return media["@_url"];
  }
  if (item.enclosure?.["@_url"]) return item.enclosure["@_url"];
  const match = item.description?.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? null;
}

function stripHtml(s: string): string {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export async function fetchRssFeed(
  url: string,
  limit = 6
): Promise<FeedItem[]> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
    });
    const parsed = parser.parse(xml);
    const items: RssItem[] = parsed?.rss?.channel?.item ?? [];
    const list = Array.isArray(items) ? items : [items];

    return list
      .map((item) => ({
        title: stripHtml(item.title ?? ""),
        link: item.link ?? "",
        pubDate: new Date(item.pubDate ?? Date.now()),
        description: stripHtml(item.description ?? ""),
        imageUrl: extractImage(item),
      }))
      .filter((p) => p.link)
      .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
      .slice(0, limit);
  } catch {
    return [];
  }
}
