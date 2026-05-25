import { ExternalLink, Wifi } from "lucide-react";
import PageTransition from "@/components/page-transition";
import { motion } from "framer-motion";

const CHANNELS = [
  { name: "Yojit Gaming Pro", url: "https://youtube.com/@yojitgamingpro", desc: "Main gaming channel", icon: "🎮" },
  { name: "YGP Minecraft", url: "https://youtube.com/@ygpminecraft", desc: "Minecraft content", icon: "⛏️" },
  { name: "YGP Countryballs", url: "https://youtube.com/@ygpcountryballs", desc: "Countryballs series", icon: "🌍" },
  { name: "YGP Tech", url: "https://youtube.com/@ygptech_official", desc: "Tech videos & tutorials", icon: "💻" },
  { name: "Yojit Art & Music", url: "https://youtube.com/@yojitartandmusic", desc: "Creative content", icon: "🎨" },
];

export default function Socials() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white pb-24">
        {/* Header */}
        <div className="relative overflow-hidden px-5 pt-14 pb-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.10),transparent_60%)]" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}>
                <Wifi className="w-5 h-5" style={{ color: "#4ade80" }} />
              </div>
              <h1 className="text-2xl font-black">Socials</h1>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
              className="text-zinc-400 text-sm">Find YGP across all platforms.</motion.p>
          </div>
        </div>

        <div className="px-5 max-w-2xl mx-auto space-y-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-base font-bold flex items-center gap-2"
            style={{ color: "#ef4444" }}
          >
            <span className="text-xl">📺</span> YouTube Channels
          </motion.h2>

          {CHANNELS.map((ch, i) => (
            <motion.a
              key={ch.url}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between p-4 rounded-2xl group block"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(239,68,68,0.15)",
                backdropFilter: "blur(12px)",
              }}
              onHoverStart={(e) => {
                const el = (e.target as HTMLElement).closest("a");
                if (el) { el.style.borderColor = "rgba(239,68,68,0.45)"; el.style.boxShadow = "0 0 20px rgba(239,68,68,0.12)"; }
              }}
              onHoverEnd={(e) => {
                const el = (e.target as HTMLElement).closest("a");
                if (el) { el.style.borderColor = "rgba(239,68,68,0.15)"; el.style.boxShadow = "none"; }
              }}
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(239,68,68,0.1)" }}>
                  {ch.icon}
                </div>
                <div>
                  <div className="font-bold text-sm text-white group-hover:text-red-300 transition-colors">{ch.name}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{ch.desc}</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-red-400 transition-colors shrink-0 ml-3" />
            </motion.a>
          ))}

          {/* Coming soon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl p-6 text-center mt-6"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(74,222,128,0.15)" }}
          >
            <motion.div className="text-3xl mb-3"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
              🎮
            </motion.div>
            <h3 className="font-bold text-white mb-2">More Coming Soon</h3>
            <p className="text-zinc-500 text-sm">Discord, Twitter & more links dropping soon.</p>
            <div className="flex items-center justify-center gap-2 mt-3">
              {["bg-red-400", "bg-purple-400", "bg-blue-400"].map((c, i) => (
                <motion.div key={i} className={`w-1.5 h-1.5 rounded-full ${c}`}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
