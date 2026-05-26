import { ExternalLink, Wifi } from "lucide-react";
import PageTransition from "@/components/page-transition";
import { motion } from "framer-motion";

interface SocialLink {
  name: string;
  handle: string;
  url: string;
}

interface Platform {
  id: string;
  label: string;
  emoji: string;
  color: string;
  bg: string;
  border: string;
  hoverBorder: string;
  hoverShadow: string;
  links: SocialLink[];
}

const YOUTUBE: Platform = {
  id: "youtube",
  label: "YouTube",
  emoji: "📺",
  color: "#ef4444",
  bg: "rgba(239,68,68,0.08)",
  border: "rgba(239,68,68,0.15)",
  hoverBorder: "rgba(239,68,68,0.45)",
  hoverShadow: "0 0 20px rgba(239,68,68,0.12)",
  links: [
    { name: "Yojit Gaming Pro", handle: "@yojitgamingpro", url: "https://youtube.com/@yojitgamingpro" },
    { name: "YGP Minecraft", handle: "@ygpminecraft", url: "https://youtube.com/@ygpminecraft" },
    { name: "YGP Countryballs", handle: "@ygpcountryballs", url: "https://youtube.com/@ygpcountryballs" },
    { name: "YGP Tech", handle: "@ygptech_official", url: "https://youtube.com/@ygptech_official" },
    { name: "Yojit Art & Music", handle: "@yojitartandmusic", url: "https://youtube.com/@yojitartandmusic" },
  ],
};

const PLATFORMS: Platform[] = [
  {
    id: "instagram",
    label: "Instagram",
    emoji: "📸",
    color: "#e1306c",
    bg: "rgba(225,48,108,0.08)",
    border: "rgba(225,48,108,0.15)",
    hoverBorder: "rgba(225,48,108,0.5)",
    hoverShadow: "0 0 20px rgba(225,48,108,0.12)",
    links: [
      { name: "Yojit Gaming Pro", handle: "@yojitgamingpro", url: "https://www.instagram.com/yojitgamingpro" },
      { name: "YGP Countryballs", handle: "@ygpcountryballs", url: "https://www.instagram.com/ygpcountryballs" },
    ],
  },
  {
    id: "x",
    label: "X / Twitter",
    emoji: "🐦",
    color: "#e7e7e7",
    bg: "rgba(231,231,231,0.06)",
    border: "rgba(231,231,231,0.12)",
    hoverBorder: "rgba(231,231,231,0.35)",
    hoverShadow: "0 0 20px rgba(231,231,231,0.06)",
    links: [
      { name: "Yojit Gaming Pro", handle: "@yojitgamingpro", url: "https://x.com/yojitgamingpro" },
      { name: "YGP Countryballs", handle: "@YGPCountryballs", url: "https://x.com/YGPCountryballs" },
    ],
  },
  {
    id: "threads",
    label: "Threads",
    emoji: "🧵",
    color: "#a855f7",
    bg: "rgba(168,85,247,0.08)",
    border: "rgba(168,85,247,0.15)",
    hoverBorder: "rgba(168,85,247,0.45)",
    hoverShadow: "0 0 20px rgba(168,85,247,0.12)",
    links: [
      { name: "Yojit Gaming Pro", handle: "@yojitgamingpro", url: "https://www.threads.com/@yojitgamingpro" },
      { name: "YGP Countryballs", handle: "@ygpcountryballs", url: "https://www.threads.com/@ygpcountryballs" },
    ],
  },
  {
    id: "facebook",
    label: "Facebook",
    emoji: "👥",
    color: "#1877f2",
    bg: "rgba(24,119,242,0.08)",
    border: "rgba(24,119,242,0.15)",
    hoverBorder: "rgba(24,119,242,0.45)",
    hoverShadow: "0 0 20px rgba(24,119,242,0.12)",
    links: [
      { name: "Yojit Gaming Pro", handle: "Facebook Page", url: "https://www.facebook.com/share/1Lc3tLg3ov/" },
    ],
  },
  {
    id: "discord",
    label: "Discord",
    emoji: "💬",
    color: "#5865f2",
    bg: "rgba(88,101,242,0.08)",
    border: "rgba(88,101,242,0.15)",
    hoverBorder: "rgba(88,101,242,0.5)",
    hoverShadow: "0 0 20px rgba(88,101,242,0.14)",
    links: [
      { name: "YGP Community", handle: "discord.gg/DkmZTKCA", url: "https://discord.gg/DkmZTKCA" },
    ],
  },
];

function PlatformSection({ platform, startDelay }: { platform: Platform; startDelay: number }) {
  return (
    <div className="space-y-3">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: startDelay }}
        className="text-sm font-bold flex items-center gap-2"
        style={{ color: platform.color }}
      >
        <span className="text-lg">{platform.emoji}</span> {platform.label}
      </motion.h2>
      {platform.links.map((link, i) => (
        <motion.a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: startDelay + 0.06 + i * 0.06, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={{ scale: 1.02, x: 4 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-between p-4 rounded-2xl group"
          style={{
            background: platform.bg,
            border: `1px solid ${platform.border}`,
            backdropFilter: "blur(12px)",
            display: "flex",
          }}
          onHoverStart={(e) => {
            const el = (e.target as HTMLElement).closest("a");
            if (el) { el.style.borderColor = platform.hoverBorder; el.style.boxShadow = platform.hoverShadow; }
          }}
          onHoverEnd={(e) => {
            const el = (e.target as HTMLElement).closest("a");
            if (el) { el.style.borderColor = platform.border; el.style.boxShadow = "none"; }
          }}
        >
          <div className="flex items-center gap-3">
            <div className="text-xl w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${platform.color}18` }}>
              {platform.emoji}
            </div>
            <div>
              <div className="font-bold text-sm text-white transition-colors" style={{ color: "white" }}>{link.name}</div>
              <div className="text-xs mt-0.5" style={{ color: platform.color + "bb" }}>{link.handle}</div>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 shrink-0 ml-3 transition-colors" style={{ color: platform.color + "66" }} />
        </motion.a>
      ))}
    </div>
  );
}

export default function Socials() {
  let delay = 0.1;

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white pb-24">
        {/* Header */}
        <div className="relative overflow-hidden px-5 pt-14 pb-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.10),transparent_60%)]" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}>
                <Wifi className="w-5 h-5" style={{ color: "#4ade80" }} />
              </div>
              <h1 className="text-2xl font-black">Socials</h1>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
              className="text-zinc-400 text-sm">Find YGP across every platform.</motion.p>
          </div>
        </div>

        <div className="px-5 max-w-2xl mx-auto space-y-8">
          {/* YouTube */}
          <div className="space-y-3">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-sm font-bold flex items-center gap-2"
              style={{ color: YOUTUBE.color }}
            >
              <span className="text-lg">{YOUTUBE.emoji}</span> {YOUTUBE.label}
            </motion.h2>
            {YOUTUBE.links.map((link, i) => (
              <motion.a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.16 + i * 0.06, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between p-4 rounded-2xl group"
                style={{
                  background: YOUTUBE.bg,
                  border: `1px solid ${YOUTUBE.border}`,
                  backdropFilter: "blur(12px)",
                  display: "flex",
                }}
                onHoverStart={(e) => {
                  const el = (e.target as HTMLElement).closest("a");
                  if (el) { el.style.borderColor = YOUTUBE.hoverBorder; el.style.boxShadow = YOUTUBE.hoverShadow; }
                }}
                onHoverEnd={(e) => {
                  const el = (e.target as HTMLElement).closest("a");
                  if (el) { el.style.borderColor = YOUTUBE.border; el.style.boxShadow = "none"; }
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="text-xl w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${YOUTUBE.color}18` }}>
                    {YOUTUBE.emoji}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">{link.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: YOUTUBE.color + "bb" }}>{link.handle}</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 shrink-0 ml-3" style={{ color: YOUTUBE.color + "66" }} />
              </motion.a>
            ))}
          </div>

          {/* Other platforms */}
          {PLATFORMS.map((platform) => {
            const d = delay;
            delay += 0.06 + platform.links.length * 0.06;
            return (
              <PlatformSection key={platform.id} platform={platform} startDelay={0.52 + d} />
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
