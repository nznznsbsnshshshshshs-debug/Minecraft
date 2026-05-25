import { useState } from "react";
import { Youtube, RefreshCw, ExternalLink } from "lucide-react";
import { useGetYouTubeRSS } from "@workspace/api-client-react";
import { VideoSkeleton } from "@/components/skeleton-card";

const CHANNELS = ["All", "Yojit Gaming Pro", "YGP Minecraft", "YGP Countryballs", "YGP Tech", "Yojit Art and Music"];

export default function YouTubePage() {
  const [activeChannel, setActiveChannel] = useState("All");
  const { data, isLoading, refetch, isFetching } = useGetYouTubeRSS();

  const allVideos = data?.videos ?? [];
  const videos = activeChannel === "All"
    ? allVideos
    : allVideos.filter((v) => v.channel === activeChannel);

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="relative overflow-hidden px-5 pt-12 pb-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.12),transparent_60%)]" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Youtube className="w-6 h-6 text-red-400" />
              <h1 className="text-2xl font-black">YGP Feed</h1>
            </div>
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
          <p className="text-zinc-400 text-sm">Latest uploads from all YGP channels. Auto-refreshes every hour.</p>
        </div>
      </div>

      {/* Channel filter — horizontal scroll */}
      <div className="px-5 mb-5">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide max-w-2xl mx-auto">
          {CHANNELS.map((ch) => (
            <button
              key={ch}
              onClick={() => setActiveChannel(ch)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeChannel === ch
                  ? "bg-red-500/20 border border-red-400/50 text-red-300"
                  : "border border-zinc-800 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-5 max-w-2xl mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <VideoSkeleton key={i} />)}
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-20">
            <Youtube className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-400">No videos available</p>
            <p className="text-zinc-600 text-sm mt-1">Check your connection or try refreshing.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {videos.map((video) => (
              <a
                key={video.videoId}
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-2xl overflow-hidden border border-zinc-800 hover:border-red-400/40 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full aspect-video object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-red-400 text-xs mb-1.5 font-medium">{video.channel}</p>
                  <h3 className="font-bold text-sm text-white line-clamp-2 leading-snug mb-2">{video.title}</h3>
                  <p className="text-zinc-500 text-xs">
                    {new Date(video.published).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
