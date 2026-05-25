import { useListMods } from "@workspace/api-client-react";
import ModCard from "@/components/mod-card";
import { ModSkeleton } from "@/components/skeleton-card";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import PageTransition from "@/components/page-transition";
import { motion, AnimatePresence } from "framer-motion";

export default function BedrockMods() {
  const { data: mods, isLoading } = useListMods({ category: "bedrock" });

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white pb-24">
        <div className="relative overflow-hidden px-5 pt-14 pb-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.12),transparent_60%)]" />
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "linear-gradient(rgba(168,85,247,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.025) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <Link href="/mods">
                <span className="flex items-center gap-1 text-zinc-500 hover:text-purple-300 text-sm mb-5 w-fit transition-colors cursor-pointer">
                  <ChevronLeft className="w-4 h-4" /> Back to Mods
                </span>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}>📱</div>
              <div>
                <h1 className="text-2xl font-black text-white">Bedrock Addons</h1>
                <p className="text-zinc-400 text-sm">PE addons, RTX packs & mobile content</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="px-5 max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => <ModSkeleton key={i} />)}
              </motion.div>
            ) : !mods || mods.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24">
                <motion.div className="text-6xl mb-4"
                  animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>📱</motion.div>
                <p className="text-zinc-400 font-semibold">No Bedrock addons uploaded yet.</p>
                <p className="text-zinc-600 text-sm mt-1">Check the Admin panel to upload some.</p>
              </motion.div>
            ) : (
              <motion.div key="grid" className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                initial="hidden" animate="show"
                variants={{ show: { transition: { staggerChildren: 0.07 } } }}>
                {mods.map((mod, i) => <ModCard key={mod.id} mod={mod} index={i} />)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
