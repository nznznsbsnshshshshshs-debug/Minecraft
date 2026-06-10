import { motion } from "framer-motion";
import { Sword, Play, Download, Star, ChevronRight } from "lucide-react";
import PageTransition from "@/components/page-transition";
import { usePerformanceConfig } from "@/lib/performance";

const FEATURED_MOD = {
  id: "ygp-last-location",
  name: "YGP Last Location Die Mod",
  description: "Never lose your death coordinates again. Built for modern Bedrock versions.",
  category: "bedrock",
  version: "1.26.20",
  downloadUrl: "#",
  imageUrl: null,
  downloads: 0,
  featured: true,
  author: "YGP",
  tags: ["Minecraft 1.20+", "Bedrock", "Coordinates", "Death Helper", "Survival"],
};

export default function Home() {
  const config = usePerformanceConfig();

  return (
    <PageTransition>
      <div className="min-h-screen pb-20">
        {/* Hero Section */}
        <div className="relative px-4 pt-12 pb-8">
          {config.enableFloatingOrbs && (
            <>
              <div className="absolute top-20 left-8 w-32 h-32 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(74,222,128,0.15), transparent 70%)",
                  filter: "blur(40px)",
                  animation: "ultraFloat 6s ease-in-out infinite",
                }} />
              <div className="absolute top-40 right-4 w-24 h-24 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(34,211,238,0.12), transparent 70%)",
                  filter: "blur(30px)",
                  animation: "ultraFloat 8s ease-in-out infinite reverse",
                }} />
            </>
          )}

          <motion.div
            initial={config.enableAnimations ? { opacity: 0, y: 20 } : undefined}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <div className="text-center mb-2">
              <motion.div
                initial={config.enableAnimations ? { scale: 0.5, opacity: 0 } : undefined}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="inline-block text-5xl mb-3"
                style={config.enable3D ? { transform: "translateZ(20px)" } : {}}
              >
                ⛏️
              </motion.div>
            </div>
            <h1
              className="text-4xl font-black text-center mb-2"
              style={{
                color: "#fff",
                textShadow: config.enableGlowEffects
                  ? "0 0 40px rgba(74,222,128,0.5), 0 0 80px rgba(74,222,128,0.2)"
                  : "none",
                transform: config.enable3D ? "translateZ(15px)" : undefined,
              }}
            >
              YGP Minecraft
            </h1>
            <p className="text-center text-zinc-400 text-sm max-w-xs mx-auto mb-6">
              Premium Minecraft Bedrock Mods, Videos, Updates and Creator Releases
            </p>

            {/* Action buttons */}
            <div className="flex gap-3 justify-center mb-8">
              <motion.button
                whileHover={config.enableAnimations ? { scale: 1.05 } : undefined}
                whileTap={config.enableAnimations ? { scale: 0.95 } : undefined}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm"
                style={{
                  background: "rgba(74,222,128,0.15)",
                  border: config.enableNeonBorders ? "1px solid rgba(74,222,128,0.5)" : "1px solid rgba(74,222,128,0.3)",
                  color: "#4ade80",
                  boxShadow: config.enableGlowEffects ? "0 0 20px rgba(74,222,128,0.15)" : "none",
                }}
              >
                <Sword className="w-4 h-4" /> Explore Mods
              </motion.button>
              <motion.button
                whileHover={config.enableAnimations ? { scale: 1.05 } : undefined}
                whileTap={config.enableAnimations ? { scale: 0.95 } : undefined}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#a1a1aa",
                }}
              >
                <Play className="w-4 h-4" /> Watch Videos
              </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto mb-8">
              {[
                { label: "Mods Released", value: "1", icon: <Sword className="w-3.5 h-3.5" /> },
                { label: "Videos Uploaded", value: "0", icon: <Play className="w-3.5 h-3.5" /> },
                { label: "Downloads", value: "0", icon: <Download className="w-3.5 h-3.5" /> },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={config.enableAnimations ? { opacity: 0, y: 10 } : undefined}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-center p-3 rounded-xl"
                  style={{
                    background: config.enableGlassmorphism ? "rgba(255,255,255,0.03)" : "rgba(20,20,20,0.8)",
                    border: "1px solid rgba(74,222,128,0.1)",
                    backdropFilter: config.enableGlassmorphism ? "blur(8px)" : undefined,
                  }}
                >
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span style={{ color: "#4ade80" }}>{stat.icon}</span>
                    <span className="text-lg font-bold text-green-400">{stat.value}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Featured Mod */}
        <div className="px-4 mb-6">
          <motion.div
            initial={config.enableAnimations ? { opacity: 0, y: 20 } : undefined}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: config.enableGlassmorphism ? "rgba(255,255,255,0.03)" : "rgba(15,15,15,0.9)",
              border: config.enableNeonBorders ? "1px solid rgba(168,85,247,0.35)" : "1px solid rgba(255,255,255,0.06)",
              backdropFilter: config.enableGlassmorphism ? "blur(16px)" : undefined,
            }}
          >
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">Featured Mod</span>
              </div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(0,0,0,0.8))" }}>
                  <span className="text-2xl" style={config.enable3D ? { transform: "translateZ(10px)" } : {}}>📱</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base mb-1">{FEATURED_MOD.name}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">{FEATURED_MOD.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {FEATURED_MOD.tags.map((t) => (
                  <span key={t} className="text-[9px] px-2 py-0.5 rounded-full font-medium"
                    style={{ background: "rgba(74,222,128,0.08)", color: "#6ee7b7", border: "1px solid rgba(74,222,128,0.15)" }}>
                    {t}
                  </span>
                ))}
              </div>
              <motion.button
                whileHover={config.enableAnimations ? { scale: 1.02 } : undefined}
                whileTap={config.enableAnimations ? { scale: 0.97 } : undefined}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-sm"
                style={{
                  background: "rgba(74,222,128,0.1)",
                  border: "1px solid rgba(74,222,128,0.3)",
                  color: "#4ade80",
                }}
              >
                Open Mod Details <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Quick links */}
        <div className="px-4 space-y-3">
          {[
            { icon: <Sword className="w-5 h-5" />, label: "Browse Mods", sub: "1 mod available", color: "#a855f7" },
            { icon: <Play className="w-5 h-5" />, label: "Video Hub", sub: "0 videos uploaded", color: "#ef4444" },
            { icon: <Download className="w-5 h-5" />, label: "Release Log", sub: "Latest changelogs", color: "#3b82f6" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={config.enableAnimations ? { opacity: 0, x: -20 } : undefined}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-2xl"
              style={{
                background: config.enableGlassmorphism ? "rgba(255,255,255,0.03)" : "rgba(15,15,15,0.8)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: config.enableGlassmorphism ? "blur(8px)" : undefined,
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${item.color}15`, border: `1px solid ${item.color}30`, color: item.color }}>
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">{item.label}</div>
                <div className="text-[11px] text-zinc-500">{item.sub}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-600" />
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
