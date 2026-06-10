import { motion } from "framer-motion";
import { Search, Filter, Sword } from "lucide-react";
import PageTransition from "@/components/page-transition";
import ModCard from "@/components/mod-card";
import { usePerformanceConfig } from "@/lib/performance";

const SAMPLE_MODS = [
  {
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
    tags: ["Bedrock", "Coordinates", "Death Helper", "Survival"],
  },
];

export default function Mods() {
  const config = usePerformanceConfig();

  return (
    <PageTransition>
      <div className="min-h-screen pb-20">
        {/* Header */}
        <div className="px-4 pt-8 pb-4">
          <motion.div
            initial={config.enableAnimations ? { opacity: 0, y: 20 } : undefined}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-black text-white mb-1">Minecraft Bedrock Mods</h1>
            <p className="text-sm text-zinc-400">Browse and download community mods</p>
          </motion.div>

          {/* Search & Filters */}
          <div className="flex gap-2 mt-4 mb-4">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <Search className="w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search mods..."
                className="bg-transparent border-none outline-none text-sm text-white placeholder-zinc-500 flex-1"
              />
            </div>
            <motion.button
              whileHover={config.enableAnimations ? { scale: 1.05 } : undefined}
              whileTap={config.enableAnimations ? { scale: 0.95 } : undefined}
              className="px-3 py-2 rounded-xl flex items-center gap-1.5"
              style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", color: "#4ade80" }}
            >
              <Filter className="w-4 h-4" /> Filter
            </motion.button>
          </div>

          {/* Filter chips */}
          <div className="flex gap-2 mb-4">
            {["All", "Newest"].map((f) => (
              <button
                key={f}
                className="px-3 py-1 rounded-lg text-xs font-medium"
                style={{
                  background: f === "All" ? "rgba(74,222,128,0.12)" : "rgba(255,255,255,0.04)",
                  border: f === "All" ? "1px solid rgba(74,222,128,0.3)" : "1px solid rgba(255,255,255,0.06)",
                  color: f === "All" ? "#4ade80" : "#71717a",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Mod grid */}
        <div className="px-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SAMPLE_MODS.map((mod, i) => (
            <ModCard key={mod.id} mod={mod} index={i} />
          ))}
        </div>

        {SAMPLE_MODS.length === 0 && (
          <div className="text-center py-16">
            <Sword className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
            <p className="text-zinc-500 text-sm">No mods available yet</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
