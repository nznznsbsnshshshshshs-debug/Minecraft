import { Router, type IRouter } from "express";
import Parser from "rss-parser";

const router: IRouter = Router();
const parser = new Parser();

const CHANNELS = [
  { name: "Yojit Gaming Pro", id: "@yojitgamingpro" },
  { name: "YGP Minecraft", id: "@ygpminecraft" },
  { name: "YGP Countryballs", id: "@ygpcountryballs" },
  { name: "YGP Tech", id: "@ygptech_official" },
  { name: "Yojit Art and Music", id: "@yojitartandmusic" },
];

router.get("/rss", async (req, res) => {
  try {
    const allVideos: any[] = [];

    for (const channel of CHANNELS) {
      try {
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?user=${channel.id.replace("@", "")}`;
        const feed = await parser.parseURL(rssUrl);

        const videos = feed.items.slice(0, 5).map((item: any) => {
          const videoId =
            item.link?.split("v=")[1] ||
            item.id?.split(":").pop() ||
            "";

          return {
            title: item.title || "Untitled",
            link: item.link,
            published: item.pubDate,
            thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
            videoId,
            channel: channel.name,
          };
        });

        allVideos.push(...videos);
      } catch (channelError) {
        req.log.error({ channelError }, `RSS FAILED FOR ${channel.name}`);
      }
    }

    allVideos.sort((a, b) => {
      return new Date(b.published).getTime() - new Date(a.published).getTime();
    });

    res.json({ success: true, count: allVideos.length, videos: allVideos });
  } catch (error) {
    req.log.error({ error }, "GLOBAL RSS ERROR");
    res.status(500).json({ success: false, message: "RSS fetch failed" });
  }
});

export default router;
