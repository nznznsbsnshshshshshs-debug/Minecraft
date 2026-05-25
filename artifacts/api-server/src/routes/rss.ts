import { Router, type IRouter } from "express";
import Parser from "rss-parser";

const router: IRouter = Router();
const parser = new Parser({
  timeout: 10000,
  headers: { "User-Agent": "Mozilla/5.0 (compatible; YGP-RSS/1.0)" },
  customFields: { item: [["media:group", "mediaGroup"], ["media:thumbnail", "mediaThumbnail"]] },
});

const CHANNELS = [
  { name: "Yojit Gaming Pro",  id: "UCO8D074-mW6jZHvJv3WQqyw" },
  { name: "YGP Minecraft",     id: "UC2qPOU2DmdFWCB48n25kOlw" },
  { name: "YGP Countryballs",  id: "UCjTIKbyiJbyaPyVUTsIXyBg" },
  { name: "YGP Tech",          id: "UCm0W2zSESrjDtHiQcR6pqEQ" },
  { name: "Yojit Art and Song",id: "UC8o27uf8chge9WO4HOk2Fag" },
];

function extractVideoId(item: any): string {
  if (item.id && item.id.includes("yt:video:")) return item.id.replace("yt:video:", "");
  if (item.link) {
    const m = item.link.match(/[?&]v=([^&]+)/);
    if (m) return m[1];
  }
  return "";
}

function extractThumbnail(item: any, videoId: string): string {
  try {
    if (item.mediaGroup?.["media:thumbnail"]?.[0]?.["$"]?.url) {
      return item.mediaGroup["media:thumbnail"][0]["$"].url;
    }
    if (item.mediaThumbnail?.["$"]?.url) return item.mediaThumbnail["$"].url;
  } catch {}
  if (videoId) return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  return "";
}

router.get("/rss", async (req, res) => {
  const allVideos: any[] = [];
  const errors: string[] = [];

  await Promise.allSettled(
    CHANNELS.map(async (channel) => {
      const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channel.id}`;
      try {
        const feed = await parser.parseURL(url);
        const videos = (feed.items ?? []).slice(0, 8).map((item: any) => {
          const videoId = extractVideoId(item);
          return {
            title:     item.title || "Untitled",
            link:      item.link  || `https://www.youtube.com/watch?v=${videoId}`,
            published: item.isoDate || item.pubDate || "",
            thumbnail: extractThumbnail(item, videoId),
            videoId,
            channel: channel.name,
          };
        });
        allVideos.push(...videos);
      } catch (err: any) {
        errors.push(`${channel.name}: ${err?.message ?? "unknown"}`);
        req.log.warn({ channel: channel.name, err }, "RSS fetch failed for channel");
      }
    })
  );

  allVideos.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());

  res.json({
    success: true,
    count: allVideos.length,
    videos: allVideos,
    ...(errors.length ? { errors } : {}),
  });
});

export default router;
