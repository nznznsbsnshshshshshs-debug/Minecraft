import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import PageTransition from "@/components/page-transition";
import { usePerformanceConfig } from "@/lib/performance";

export default function Admin() {
  const config = usePerformanceConfig();
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Simple admin gate — real auth would be server-side
    if (password.length > 0) setLoggedIn(true);
  };

  if (!loggedIn) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center pb-20 px-4">
          <motion.div
            initial={config.enableAnimations ? { opacity: 0, scale: 0.95 } : undefined}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
                style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}>
                <ShieldCheck className="w-8 h-8 text-green-400" />
              </div>
              <h1 className="text-xl font-black text-white">Admin Access</h1>
              <p className="text-zinc-500 text-xs mt-1">Enter password to continue</p>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-xl bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
                <button
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <motion.button
                onClick={handleLogin}
                whileHover={config.enableAnimations ? { scale: 1.02 } : undefined}
                whileTap={config.enableAnimations ? { scale: 0.97 } : undefined}
                className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                style={{
                  background: "rgba(74,222,128,0.15)",
                  border: "1px solid rgba(74,222,128,0.3)",
                  color: "#4ade80",
                }}
              >
                <Lock className="w-4 h-4" /> Login
              </motion.button>
            </div>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pb-20">
        <div className="px-4 pt-8">
          <motion.div
            initial={config.enableAnimations ? { opacity: 0, y: 20 } : undefined}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-black text-white mb-1">Admin Panel</h1>
            <p className="text-sm text-zinc-400">Manage mods, content and settings</p>
          </motion.div>

          <div className="mt-6 space-y-3">
            {["Manage Mods", "Upload Content", "View Analytics", "Settings"].map((item, i) => (
              <motion.div
                key={item}
                initial={config.enableAnimations ? { opacity: 0, y: 10 } : undefined}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="p-4 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span className="text-sm font-bold text-white">{item}</span>
                <p className="text-[11px] text-zinc-500 mt-0.5">Coming soon</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
