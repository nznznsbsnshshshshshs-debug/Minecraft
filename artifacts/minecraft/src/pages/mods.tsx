import { useState, useMemo } from "react";
import { Sword, Filter, Search, X } from "lucide-react";
import { useListMods } from "@workspace/api-client-react";
import ModCard from "@/components/mod-card";
import { ModSkeleton } from "@/components/skeleton-card";
import { Link } from "wouter";
import PageTransition from "@/components/page-transition";
import { motion, AnimatePresence } from "framer-motion";

const FILTERS = [
  { value: "" as const, label: "All", color: "#4ade80" },
  { value: "java" as const, label: "☕ Java", color: "#3b82f6" },
  { value: "bedrock" as const, label: "📱 Bedrock", color: "#a855f7" },
];

export default function Mods() {
  const [category, setCategory] = useState<"" | "java" | "bedrock">("");
  const [query, setQuery] = useState("");
  const { data: mods, isLoading } = useListMods(category ? { category } : {});

  const filtered = useMemo(() => {
    if (!mods) return [];
    const q = query.trim().toLowerCase();
    if (!q) return mods;
    return mods.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.author.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [mods, query]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white pb-24">
        {/* Header */}
        <div className="relative overflow-hidden px-5 pt-14 pb-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.12),transparent_60%)]" />
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "linear-gradient(rgba(74,222,128,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.025) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}>
                <Sword className="w-5 h-5" style={{ color: "#4ade80" }} />
              </div>
              <h1 className="text-2xl font-black">Mods Hub</h1>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
              className="text-zinc-400 text-sm mb-4">
              All YGP Minecraft mods and Bedrock addons in one place.
            </motion.p>

            {/* Quick nav pills */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="flex gap-2">
              {[{ href: "/mods/java", label: "☕ Java Mods", color: "#3b82f6" }, { href: "/mods/bedrock", label: "📱 Bedrock", color: "#a855f7" }].map(({ href, label, color }) => (
                <Link key={href} href={href}>
                  <span className="px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all"
                    style={{ border: `1px solid ${color}44`, color, background: `${color}11` }}>
                    {label}
                  </span>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Search + Filter bar */}
        <div className="px-5 mb-6 max-w-2xl mx-auto space-y-3">
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="relative"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, author, tag…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${query ? "rgba(74,222,128,0.4)" : "rgba(255,255,255,0.08)"}`,
                boxShadow: query ? "0 0 12px rgba(74,222,128,0.08)" : "none",
              }}
            />
            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Category filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-zinc-600 shrink-0" />
            <div className="flex gap-2">
              {FILTERS.map(({ value, label, color }) => (
                <motion.button
                  key={value}
                  onClick={() => setCategory(value)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 relative"
                  style={{
                    background: category === value ? `${color}18` : "rgba(255,255,255,0.04)",
                    border: `1px solid ${category === value ? color + "60" : "rgba(255,255,255,0.08)"}`,
                    color: category === value ? color : "#71717a",
                  }}
                >
                  {label}
                  {category === value && (
                    <motion.div layoutId="filterPill" className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{ boxShadow: `0 0 12px ${color}44` }} />
                  )}
                </motion.button>
              ))}
            </div>
            {query && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-auto text-xs text-zinc-500"
              >
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </motion.span>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="px-5 max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => <ModSkeleton key={i} />)}
              </motion.div>
            ) : filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24">
                <motion.div className="text-6xl mb-4" animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" as const }}>⚔️</motion.div>
                {query ? (
                  <>
                    <p className="text-zinc-400 font-semibold">No mods match "{query}"</p>
                    <button onClick={() => setQuery("")}
                      className="mt-3 text-sm font-semibold transition-colors" style={{ color: "#4ade80" }}>
                      Clear search
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-zinc-400 font-semibold">No mods available yet.</p>
                    <p className="text-zinc-600 text-sm mt-1">Check back soon!</p>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map((mod, i) => <ModCard key={mod.id} mod={mod} index={i} />)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
