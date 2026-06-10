import { motion } from "framer-motion";
import { Home } from "lucide-react";
import PageTransition from "@/components/page-transition";
import { usePerformanceConfig } from "@/lib/performance";
import { useLocation } from "wouter";

export default function NotFound() {
  const config = usePerformanceConfig();
  const [, navigate] = useLocation();

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center pb-20 px-4">
        <motion.div
          initial={config.enableAnimations ? { opacity: 0, scale: 0.95 } : undefined}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">⛏️</div>
          <h1 className="text-3xl font-black text-white mb-2">404</h1>
          <p className="text-zinc-400 text-sm mb-6">This chunk hasn't been generated yet</p>
          <motion.button
            onClick={() => navigate("/")}
            whileHover={config.enableAnimations ? { scale: 1.05 } : undefined}
            whileTap={config.enableAnimations ? { scale: 0.95 } : undefined}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm"
            style={{
              background: "rgba(74,222,128,0.15)",
              border: "1px solid rgba(74,222,128,0.3)",
              color: "#4ade80",
            }}
          >
            <Home className="w-4 h-4" /> Back to Home
          </motion.button>
        </motion.div>
      </div>
    </PageTransition>
  );
}
