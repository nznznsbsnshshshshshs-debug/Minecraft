import { Link } from "wouter";
import { Sword, Youtube, ChevronRight, Zap, Star, Cpu } from "lucide-react";
import ParticleBg from "@/components/particle-bg";
import PageTransition from "@/components/page-transition";
import { useListMods } from "@workspace/api-client-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const FEATURE_CARDS = [
  { icon: "☕", title: "Java Mods", desc: "Shaders, textures & gameplay upgrades", href: "/mods/java", color: "#3b82f6", glow: "rgba(59,130,246,0.25)" },
  { icon: "📱", title: "Bedrock Addons", desc: "PE addons, RTX packs, mobile content", href: "/mods/bedrock", color: "#a855f7", glow: "rgba(168,85,247,0.25)" },
  { icon: "🎬", title: "YGP Studio", desc: "YouTube, Shorts & cinematic content", href: "/youtube", color: "#ef4444", glow: "rgba(239,68,68,0.25)" },
];

export default function Home() {
  const { data: mods } = useListMods({ featured: "true" });
  const featured = (mods ?? []).slice(0, 3);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [rgbMode, setRgbMode] = useState(false);

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white pb-24">
        <ParticleBg count={45} rgb={rgbMode} />

        {/* Hero */}
        <section ref={heroRef} className="relative overflow-hidden min-h-[88vh] flex flex-col items-center justify-center px-5 pt-10 pb-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.18),transparent_65%)]" />
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-2xl mx-auto text-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full mb-6 font-semibold"
              style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80" }}
            >
              <motion.span animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }}>
                <Zap className="w-3.5 h-3.5" />
              </motion.span>
              YGP Minecraft Universe
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h1 className="text-5xl sm:text-7xl font-black mb-2 leading-none tracking-tight">
                <span className="block text-white">YGP</span>
                <span
                  className="block bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent"
                  style={{ filter: "drop-shadow(0 0 40px rgba(74,222,128,0.5))" }}
                >
                  Minecraft
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-zinc-400 text-base sm:text-lg max-w-md mx-auto mb-10 leading-relaxed"
            >
              Futuristic mods, addons, creator content & cinematic experiences — all in one hub.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
            >
              <Link href="/mods">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-base cursor-pointer"
                  style={{ background: "linear-gradient(135deg, #4ade80, #22c55e)", boxShadow: "0 0 30px rgba(74,222,128,0.45)", color: "#000" }}
                >
                  <Sword className="w-4 h-4" /> Explore Mods
                </motion.span>
              </Link>
              <Link href="/youtube">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-base cursor-pointer"
                  style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#fff", background: "rgba(255,255,255,0.05)" }}
                >
                  <Youtube className="w-4 h-4" /> Watch Videos
                </motion.span>
              </Link>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={() => setRgbMode(!rgbMode)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs font-mono px-3 py-1.5 rounded-lg transition-all"
              style={{
                background: rgbMode ? "rgba(255,100,100,0.15)" : "rgba(74,222,128,0.08)",
                border: rgbMode ? "1px solid rgba(255,100,100,0.4)" : "1px solid rgba(74,222,128,0.2)",
                color: rgbMode ? "#f87171" : "#4ade80",
              }}
            >
              {rgbMode ? "⚡ RGB MODE ON" : "🎨 RGB MODE"}
            </motion.button>
          </motion.div>

          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{ color: "rgba(74,222,128,0.4)" }}
          >
            <div className="w-5 h-8 rounded-full border-2 border-current flex items-start justify-center pt-1.5">
              <div className="w-1 h-2 rounded-full bg-current" />
            </div>
          </motion.div>
        </section>

        {/* Feature cards */}
        <section className="relative z-10 px-5 pb-10 -mt-4">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {FEATURE_CARDS.map(({ icon, title, desc, href, color, glow }) => (
              <motion.div key={href} variants={item}>
                <Link href={href}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group rounded-2xl p-5 cursor-pointer overflow-hidden h-full"
                    style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${color}22`, backdropFilter: "blur(16px)" }}
                  >
                    <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl transition-opacity duration-300"
                      style={{ boxShadow: `0 0 30px ${glow}`, background: `radial-gradient(ellipse at 50% 0%, ${glow.replace("0.25", "0.08")}, transparent 70%)` }} />
                    <div className="text-3xl mb-3 relative z-10">{icon}</div>
                    <h3 className="font-bold text-base mb-1.5 relative z-10" style={{ color }}>{title}</h3>
                    <p className="text-zinc-400 text-sm leading-snug relative z-10">{desc}</p>
                    <div className="flex items-center gap-1 mt-4 text-xs text-zinc-600 group-hover:text-zinc-300 transition-colors relative z-10">
                      Explore <ChevronRight className="w-3 h-3" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Featured mods — only when real data exists */}
        {featured.length > 0 && (
          <section className="relative z-10 px-5 pb-10">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-between mb-5"
              >
                <h2 className="text-lg font-black flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  Featured Mods
                </h2>
                <Link href="/mods">
                  <span className="text-sm font-semibold flex items-center gap-1" style={{ color: "#4ade80" }}>
                    All mods <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {featured.map((mod) => (
                  <motion.div
                    key={mod.id}
                    variants={item}
                    className="rounded-2xl p-4 cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(74,222,128,0.15)", backdropFilter: "blur(12px)" }}
                    whileHover={{ scale: 1.02, borderColor: "rgba(74,222,128,0.4)" }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-sm text-white">{mod.name}</h3>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border shrink-0 ${
                        mod.category === "java" ? "border-blue-400/30 text-blue-300" : "border-purple-400/30 text-purple-300"
                      }`}>{mod.category}</span>
                    </div>
                    <p className="text-zinc-400 text-xs line-clamp-2 mb-3">{mod.description}</p>
                    <a href={mod.downloadUrl} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-semibold flex items-center gap-1" style={{ color: "#4ade80" }}>
                      Download <ChevronRight className="w-3 h-3" />
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* Live status — no fake numbers */}
        <section className="relative z-10 px-5 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(74,222,128,0.1)", backdropFilter: "blur(16px)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-4 h-4" style={{ color: "#4ade80" }} />
              <span className="text-xs font-mono" style={{ color: "rgba(74,222,128,0.7)" }}>SYSTEM.STATUS</span>
              <div className="flex-1 h-px" style={{ background: "rgba(74,222,128,0.15)" }} />
              <motion.div className="w-2 h-2 rounded-full bg-green-400"
                animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
              <span className="text-xs font-mono text-green-400">ONLINE</span>
            </div>
            <p className="text-zinc-500 text-xs font-mono">All systems operational. Connect via the navigation below.</p>
          </motion.div>
        </section>
      </div>
    </PageTransition>
  );
}
