import { useState } from "react";
import { Youtube, RefreshCw, ExternalLink, Play } from "lucide-react";
import { useGetYouTubeRSS } from "@workspace/api-client-react";
import { VideoSkeleton } from "@/components/skeleton-card";
import PageTransition from "@/components/page-transition";
import { motion, AnimatePresence } from "framer-motion";

const CHANNELS = ["All", "Yojit Gaming Pro", "YGP Minecraft", "YGP Countryballs", "YGP Tech", "Yojit Art and Music"];

export default function YouTubePage() {
  const [activeChannel, setActiveChannel] = useState("All");
  const { data, isLoading, refetch, isFetching } = useGetYouTubeRSS();

  const allVideos = data?.videos ?? [];
  const videos = activeChannel === "All" ? allVideos : allVideos.filter((v) => v.channel === activeChannel);

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white pb-24">
        {/* Header */}
        <div className="relative overflow-hidden px-5 pt-14 pb-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.12),transparent_60%)]" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <Youtube className="w-5 h-5 text-red-400" />
                </div>
                <h1 className="text-2xl font-black">YGP Feed</h1>
              </div>
              <motion.button
                onClick={() => refetch()}
                disabled={isFetching}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl disabled:opacity-50 transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#a1a1aa" }}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`} />
                Refresh
              </motion.button>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
              className="text-zinc-400 text-sm">Latest uploads from all YGP channels.</motion.p>
          </div>
        </div>

        {/* Channel filter */}
        <div className="px-5 mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide max-w-2xl mx-auto">
            {CHANNELS.map((ch) => (
              <motion.button
                key={ch}
                onClick={() => setActiveChannel(ch)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
                style={{
                  background: activeChannel === ch ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${activeChannel === ch ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.08)"}`,
                  color: activeChannel === ch ? "#f87171" : "#71717a",
                  boxShadow: activeChannel === ch ? "0 0 12px rgba(239,68,68,0.2)" : "none",
                }}
              >
                {ch}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="px-5 max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => <VideoSkeleton key={i} />)}
              </motion.div>
            ) : videos.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24">
                <Youtube className="w-12 h-12 mx-auto mb-4" style={{ color: "rgba(239,68,68,0.3)" }} />
                <p className="text-zinc-400 font-semibold">No videos available</p>
                <p className="text-zinc-600 text-sm mt-1">Check your connection or try refreshing.</p>
              </motion.div>
            ) : (
              <motion.div key="grid" className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.06 } } }}>
                {videos.map((video, i) => (
                  <motion.a
                    key={video.videoId}
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
                    }}
                    whileHover={{ scale: 1.02, y: -3 }}
                    className="block rounded-2xl overflow-hidden group"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      backdropFilter: "blur(12px)",
                    }}
                    onHoverStart={(e) => {
                      const el = (e.target as HTMLElement).closest("a");
                      if (el) { el.style.borderColor = "rgba(239,68,68,0.35)"; el.style.boxShadow = "0 0 24px rgba(239,68,68,0.12)"; }
                    }}
                    onHoverEnd={(e) => {
                      const el = (e.target as HTMLElement).closest("a");
                      if (el) { el.style.borderColor = "rgba(255,255,255,0.07)"; el.style.boxShadow = "none"; }
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full aspect-video object-cover"
                        loading="lazy"
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(239,68,68,0.9)" }}
                        >
                          <Play className="w-5 h-5 text-white ml-0.5" />
                        </motion.div>
                      </div>
                      <div className="absolute top-2 left-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: "rgba(239,68,68,0.85)", color: "#fff" }}>
                          {video.channel.split(" ")[0]}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-red-400 text-xs mb-1.5 font-semibold">{video.channel}</p>
                      <h3 className="font-bold text-sm text-white line-clamp-2 leading-snug mb-2">{video.title}</h3>
                      <p className="text-zinc-500 text-xs">
                        {[video.views, video.published].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
