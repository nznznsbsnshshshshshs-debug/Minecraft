import { Router, type IRouter } from "express";

const router: IRouter = Router();

const INNERTUBE_KEY = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8";
const INNERTUBE_URL = `https://www.youtube.com/youtubei/v1/browse?key=${INNERTUBE_KEY}`;
const VIDEOS_PARAMS = "EgZ2aWRlb3M%3D";

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
  channel: string;
  views: string;
}

function collectTiles(obj: any, results: any[] = [], depth = 0): any[] {
  if (depth > 25 || !obj || typeof obj !== "object") return results;
  if (obj.tileRenderer) results.push(obj.tileRenderer);
  for (const v of Object.values(obj)) collectTiles(v, results, depth + 1);
  return results;
}

function parseTile(tile: any, channelName: string): VideoItem | null {
  try {
    const thumbUrl: string =
      tile.header?.tileHeaderRenderer?.thumbnail?.thumbnails?.[0]?.url ?? "";
    const videoId = thumbUrl.match(/\/vi\/([a-zA-Z0-9_-]{11})\//)?.[1];
    if (!videoId) return null;

    const meta = tile.metadata?.tileMetadataRenderer;
    const title: string = meta?.title?.simpleText ?? "";
    if (!title) return null;

    const lines: any[] = meta?.lines ?? [];
    const infoItems: any[] = lines[1]?.lineRenderer?.items ?? [];
    const views: string = infoItems[0]?.lineItemRenderer?.text?.simpleText ?? "";
    const published: string =
      infoItems[2]?.lineItemRenderer?.text?.simpleText ??
      infoItems[1]?.lineItemRenderer?.text?.simpleText ?? "";

    const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    return {
      title,
      link: `https://www.youtube.com/watch?v=${videoId}`,
      published,
      thumbnail,
      videoId,
      channel: channelName,
      views,
    };
  } catch {
    return null;
  }
}

async function fetchChannelVideos(
  channel: { name: string; id: string },
  max = 8
): Promise<VideoItem[]> {
  const res = await fetch(INNERTUBE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      browseId: channel.id,
      params: VIDEOS_PARAMS,
      context: {
        client: {
          clientName: "TVHTML5",
          clientVersion: "7.20240101",
          hl: "en",
          gl: "US",
        },
      },
    }),
    signal: AbortSignal.timeout(12000),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  const tiles = collectTiles(data);
  const videos: VideoItem[] = [];
  for (const tile of tiles) {
    if (videos.length >= max) break;
    const v = parseTile(tile, channel.name);
    if (v) videos.push(v);
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
      } catch (err: any) {
        errors.push(`${channel.name}: ${err?.message ?? "unknown"}`);
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
