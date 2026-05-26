import { Router, type IRouter } from "express";
import Parser from "rss-parser";

const router: IRouter = Router();

const CHANNELS = [
  { name: "Yojit Gaming Pro",    id: "UCO8D074-mW6jZHvJv3WQqyw" },
  { name: "YGP Minecraft",       id: "UC2qPOU2DmdFWCB48n25kOlw" },
  { name: "YGP Countryballs",    id: "UCjTIKbyiJbyaPyVUTsIXyBg" },
  { name: "YGP Tech",            id: "UCm0W2zSESrjDtHiQcR6pqEQ" },
  { name: "Yojit Art and Music", id: "UC8o27uf8chge9WO4HOk2Fag" },
];

interface VideoItem {
  title: string;
  link: string;
  published: string;
  thumbnail: string;
  videoId: string;
  channelId: string;
  channel: string;
  views: string;
}

type CustomFeed = Record<string, never>;
type CustomItem = {
  "yt:videoId"?: string;
  "yt:channelId"?: string;
  "media:group"?: {
    "media:thumbnail"?: { $?: { url?: string } };
  };
};

const parser = new Parser<CustomFeed, CustomItem>({
  customFields: {
    item: [
      ["yt:videoId", "yt:videoId"],
      ["yt:channelId", "yt:channelId"],
      ["media:group", "media:group"],
    ],
  },
  timeout: 12000,
});

async function fetchChannelVideos(
  channel: { name: string; id: string },
  max = 8
): Promise<VideoItem[]> {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channel.id.trim()}`;
  const feed = await parser.parseURL(url);

  const videos: VideoItem[] = [];
  for (const item of feed.items.slice(0, max)) {
    const videoId = (item["yt:videoId"] ?? "").trim();
    if (!videoId) continue;

    const thumbnail =
      item["media:group"]?.["media:thumbnail"]?.["$"]?.url ??
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    videos.push({
      title: item.title ?? "",
      link: item.link ?? `https://www.youtube.com/watch?v=${videoId}`,
      published: item.pubDate ?? item.isoDate ?? "",
      thumbnail,
      videoId,
      channelId: channel.id.trim(),
      channel: channel.name,
      views: "",
    });
  }
  return videos;
}

router.get("/rss", async (req, res) => {
  const allVideos: VideoItem[] = [];
  const errors: string[] = [];

  await Promise.allSettled(
    CHANNELS.map(async (channel) => {
      try {
        const videos = await fetchChannelVideos(channel);
        allVideos.push(...videos);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "unknown";
        errors.push(`${channel.name}: ${msg}`);
        req.log.warn({ channel: channel.name, err }, "Failed to fetch channel videos");
      }
    })
  );

  const seen = new Set<string>();
  const deduped = allVideos.filter((v) => {
    if (seen.has(v.videoId)) return false;
    seen.add(v.videoId);
    return true;
  });

  res.json({
    success: true,
    count: deduped.length,
    videos: deduped,
    ...(errors.length ? { errors } : {}),
  });
});

export default router;
