import { useListMods } from "@workspace/api-client-react";
import ModCard from "@/components/mod-card";
import { ModSkeleton } from "@/components/skeleton-card";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";

export default function BedrockMods() {
  const { data: mods, isLoading } = useListMods({ category: "bedrock" });

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="relative overflow-hidden px-5 pt-12 pb-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.12),transparent_60%)]" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <Link href="/mods">
            <span className="flex items-center gap-1 text-zinc-500 hover:text-zinc-300 text-sm mb-4 w-fit">
              <ChevronLeft className="w-4 h-4" /> Back to Mods
            </span>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📱</span>
            <h1 className="text-2xl font-black text-white">Bedrock Addons</h1>
          </div>
          <p className="text-zinc-400 text-sm">PE addons, RTX packs, survival tools, and mobile content.</p>
        </div>
      </div>

      <div className="px-5 max-w-2xl mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <ModSkeleton key={i} />)}
          </div>
        ) : !mods || mods.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📱</div>
            <p className="text-zinc-400">No Bedrock addons uploaded yet.</p>
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
