/**
 * RSS Feed Fetcher for YGP Minecraft
 * 
 * Since this is a Vite SPA (not Next.js), we cannot use server-side API routes.
 * Instead, we fetch YouTube RSS feeds directly from the client using a CORS proxy.
 */

export interface RSSVideoItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail: string;
  videoId: string;
}

export interface RSSFeed {
  title: string;
  link: string;
  items: RSSVideoItem[];
}

const YGP_CHANNEL_IDS = [
  "UCyojitgamingpro", // YGP main channel
];

// Use a CORS proxy for client-side RSS fetching
const CORS_PROXY = "https://api.allorigins.win/raw?url=";

export async function fetchYouTubeRSS(channelId: string): Promise<RSSFeed> {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const proxyUrl = `${CORS_PROXY}${encodeURIComponent(rssUrl)}`;

  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");

    const feedTitle = xml.querySelector("title")?.textContent || "YouTube Feed";
    const feedLink = xml.querySelector("link")?.getAttribute("href") || "";

    const entries = xml.querySelectorAll("entry");
    const items: RSSVideoItem[] = Array.from(entries).map((entry) => {
      const title = entry.querySelector("title")?.textContent || "";
      const link = entry.querySelector("link")?.getAttribute("href") || "";
      const pubDate = entry.querySelector("published")?.textContent || "";
      const description = entry.querySelector("summary")?.textContent || "";
      const mediaGroup = entry.querySelector("media\\:group, group");
      const thumbnail = mediaGroup?.querySelector("media\\:thumbnail, thumbnail")?.getAttribute("url") || "";
      const videoId = link.includes("v=") 
        ? link.split("v=")[1]?.split("&")[0] 
        : link.split("/").pop() || "";

      return { title, link, pubDate, description, thumbnail, videoId };
    });

    return { title: feedTitle, link: feedLink, items };
  } catch (error) {
    console.error("Failed to fetch RSS feed:", error);
    return { title: "YouTube Feed", link: "", items: [] };
  }
}

export async function fetchAllFeeds(): Promise<RSSFeed[]> {
  const feeds = await Promise.all(
    YGP_CHANNEL_IDS.map((id) => fetchYouTubeRSS(id))
  );
  return feeds;
}
