import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Youtube, Play, ExternalLink, RefreshCw } from "lucide-react";
import PageTransition from "@/components/page-transition";
import { usePerformanceConfig } from "@/lib/performance";
import { fetchYouTubeRSS, type RSSVideoItem } from "@/lib/rss";

const YOUTUBE_CHANNEL_ID = "UCyojitgamingpro";

export default function YouTube() {
  const config = usePerformanceConfig();
  const [videos, setVideos] = useState<RSSVideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFeed = async () => {
    setLoading(true);
    setError(null);
    try {
      const feed = await fetchYouTubeRSS(YOUTUBE_CHANNEL_ID);
      setVideos(feed.items);
    } catch (err) {
      setError("Failed to load videos");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen pb-20">
        <div className="px-4 pt-8 pb-4">
          <motion.div
            initial={config.enableAnimations ? { opacity: 0, y: 20 } : undefined}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-2xl font-black text-white mb-1">Video Hub</h1>
              <p className="text-sm text-zinc-400">Watch YGP content and tutorials</p>
            </div>
            <motion.button
              onClick={loadFeed}
              whileHover={config.enableAnimations ? { scale: 1.1, rotate: 180 } : undefined}
              whileTap={config.enableAnimations ? { scale: 0.9 } : undefined}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <RefreshCw className={`w-4 h-4 text-zinc-400 ${loading ? "animate-spin" : ""}`} />
            </motion.button>
          </motion.div>
        </div>

        {loading && (
          <div className="px-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-full aspect-video" style={{ background: "rgba(255,255,255,0.04)" }} />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-3/4 rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
                  <div className="h-3 w-1/2 rounded" style={{ background: "rgba(255,255,255,0.04)" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12 px-4">
            <p className="text-zinc-500 text-sm">{error}</p>
            <motion.button
              onClick={loadFeed}
              whileHover={config.enableAnimations ? { scale: 1.05 } : undefined}
              className="mt-3 px-4 py-2 rounded-lg text-sm"
              style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", color: "#4ade80" }}
            >
              Retry
            </motion.button>
          </div>
        )}

        {!loading && !error && videos.length === 0 && (
          <div className="text-center py-16 px-4">
            <motion.div
              initial={config.enableAnimations ? { scale: 0.8, opacity: 0 } : undefined}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
              }}
            >
              <Youtube className="w-10 h-10 text-red-400" />
            </motion.div>
            <h2 className="text-lg font-bold text-white mb-2">No videos available currently</h2>
            <p className="text-zinc-500 text-sm mb-6 max-w-xs mx-auto">
              Videos will appear here once uploaded to YouTube.
            </p>
            <motion.a
              href="https://youtube.com/@yojitgamingpro"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={config.enableAnimations ? { scale: 1.05 } : undefined}
              whileTap={config.enableAnimations ? { scale: 0.95 } : undefined}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm"
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#f87171",
              }}
            >
              <ExternalLink className="w-4 h-4" /> Visit YouTube Channel
            </motion.a>
          </div>
        )}

        {!loading && !error && videos.length > 0 && (
          <div className="px-4 space-y-3">
            {videos.map((video, i) => (
              <motion.a
                key={video.videoId}
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={config.enableAnimations ? { opacity: 0, y: 20 } : undefined}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={config.enableAnimations ? { scale: 1.02 } : undefined}
                className="block rounded-2xl overflow-hidden"
                style={{
                  background: config.enableGlassmorphism ? "rgba(255,255,255,0.03)" : "rgba(15,15,15,0.8)",
                  border: config.enableNeonBorders ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: config.enableGlassmorphism ? "blur(8px)" : undefined,
                }}
              >
                {video.thumbnail && (
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-sm font-bold text-white line-clamp-2 mb-1">{video.title}</h3>
                  <p className="text-[11px] text-zinc-500">
                    {video.pubDate ? new Date(video.pubDate).toLocaleDateString() : "Unknown date"}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
