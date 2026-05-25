import { useState } from "react";
import { Sword, Filter } from "lucide-react";
import { useListMods } from "@workspace/api-client-react";
import ModCard from "@/components/mod-card";
import { ModSkeleton } from "@/components/skeleton-card";
import { Link } from "wouter";

export default function Mods() {
  const [category, setCategory] = useState<"" | "java" | "bedrock">("");
  const { data: mods, isLoading } = useListMods(category ? { category } : {});

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="relative overflow-hidden px-5 pt-12 pb-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.12),transparent_60%)]" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Sword className="w-6 h-6 text-green-400" />
            <h1 className="text-2xl font-black text-white">Mods Hub</h1>
          </div>
          <p className="text-zinc-400 text-sm">All YGP Minecraft mods and Bedrock addons in one place.</p>

          {/* Quick nav */}
          <div className="flex gap-2 mt-4">
            <Link href="/mods/java">
              <span className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-blue-400/30 text-blue-300 hover:bg-blue-500/10 transition-colors">☕ Java</span>
            </Link>
            <Link href="/mods/bedrock">
              <span className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-purple-400/30 text-purple-300 hover:bg-purple-500/10 transition-colors">📱 Bedrock</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="px-5 mb-5 max-w-2xl mx-auto">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-zinc-500" />
          {(["", "java", "bedrock"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                category === cat
                  ? "bg-green-500/20 border border-green-400/50 text-green-300"
                  : "border border-zinc-800 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {cat === "" ? "All" : cat === "java" ? "Java" : "Bedrock"}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-5 max-w-2xl mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <ModSkeleton key={i} />)}
          </div>
        ) : !mods || mods.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">⚔️</div>
            <p className="text-zinc-400">No mods available yet.</p>
            <p className="text-zinc-600 text-sm mt-1">Check back soon or upload one from the Admin panel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mods.map((mod) => <ModCard key={mod.id} mod={mod} />)}
          </div>
        )}
      </div>
    </div>
  );
}
