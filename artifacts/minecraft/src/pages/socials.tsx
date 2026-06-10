import { motion } from "framer-motion";
import { ExternalLink, Instagram, Youtube, Twitter, Facebook } from "lucide-react";
import PageTransition from "@/components/page-transition";
import { usePerformanceConfig } from "@/lib/performance";

const SOCIALS = [
  {
    platform: "Instagram",
    handle: "@yojitgamingpro",
    url: "https://instagram.com/yojitgamingpro",
    icon: <Instagram className="w-5 h-5" />,
    color: "#E4405F",
    emoji: "💎",
  },
  {
    platform: "YouTube",
    handle: "@yojitgamingpro",
    url: "https://youtube.com/@yojitgamingpro",
    icon: <Youtube className="w-5 h-5" />,
    color: "#FF0000",
    emoji: "🔴",
  },
  {
    platform: "X (Twitter)",
    handle: "@yojitgamingpro",
    url: "https://x.com/yojitgamingpro",
    icon: <Twitter className="w-5 h-5" />,
    color: "#1DA1F2",
    emoji: "⚡",
  },
  {
    platform: "Facebook",
    handle: "YGP",
    url: "https://facebook.com/",
    icon: <Facebook className="w-5 h-5" />,
    color: "#1877F2",
    emoji: "🔵",
  },
  {
    platform: "Threads",
    handle: "@yojitgamingpro",
    url: "https://threads.net/yojitgamingpro",
    icon: <ExternalLink className="w-5 h-5" />,
    color: "#000000",
    emoji: "🧵",
  },
];

export default function Socials() {
  const config = usePerformanceConfig();

  return (
    <PageTransition>
      <div className="min-h-screen pb-20">
        <div className="px-4 pt-8 pb-4">
          <motion.div
            initial={config.enableAnimations ? { opacity: 0, y: 20 } : undefined}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-black text-white mb-1">YGP Socials</h1>
            <p className="text-sm text-zinc-400">Follow updates across platforms</p>
          </motion.div>
        </div>

        <div className="px-4 space-y-3">
          {SOCIALS.map((s, i) => (
            <motion.a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={config.enableAnimations ? { opacity: 0, x: -20 } : undefined}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={config.enableAnimations ? { scale: 1.02, x: 4 } : undefined}
              className="flex items-center gap-4 p-4 rounded-2xl"
              style={{
                background: config.enableGlassmorphism ? "rgba(255,255,255,0.03)" : "rgba(15,15,15,0.8)",
                border: config.enableNeonBorders ? `1px solid ${s.color}35` : "1px solid rgba(255,255,255,0.06)",
                backdropFilter: config.enableGlassmorphism ? "blur(8px)" : undefined,
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: `${s.color}18`,
                  border: `1px solid ${s.color}35`,
                  color: s.color === "#000000" ? "#fff" : s.color,
                  boxShadow: config.enableGlowEffects ? `0 0 15px ${s.color}20` : "none",
                }}
              >
                {s.emoji ? <span className="text-xl">{s.emoji}</span> : s.icon}
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">{s.platform}</div>
                <div className="text-[11px] text-zinc-500">{s.handle}</div>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-600" />
            </motion.a>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
