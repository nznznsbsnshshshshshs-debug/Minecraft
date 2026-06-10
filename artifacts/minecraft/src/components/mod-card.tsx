import { Download, Tag, Star, Zap } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { usePerformanceConfig } from "@/lib/performance";

interface Mod {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  downloadUrl: string;
  imageUrl?: string | null;
  downloads: number;
  featured: boolean;
  author: string;
  tags: string[];
}

export default function ModCard({ mod, index = 0 }: { mod: Mod; index?: number }) {
  const config = usePerformanceConfig();
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const tiltAmount = config.card3DTilt ? 8 : 0;
  const rotateX = useTransform(y, [-60, 60], [tiltAmount, -tiltAmount]);
  const rotateY = useTransform(x, [-60, 60], [-tiltAmount, tiltAmount]);
  const sX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const sY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const [downloads, setDownloads] = useState(mod.downloads);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!config.card3DTilt) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const resetMouse = () => { x.set(0); y.set(0); };

  const handleDownloadClick = () => {
    setDownloads((d) => d + 1);
  };

  const isJava = mod.category === "java";

  const accentColor = isJava ? "59,130,246" : "168,85,247";
  const accentHex = isJava ? "#3b82f6" : "#a855f7";

  return (
    <motion.div
      initial={config.enableAnimations ? { opacity: 0, y: 30 } : undefined}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: config.enableAnimations ? index * 0.07 : 0, ease: [0.25, 0.1, 0.25, 1] }}
      style={config.card3DTilt ? { perspective: config.perspective3D } : undefined}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX: config.card3DTilt ? sX : 0,
          rotateY: config.card3DTilt ? sY : 0,
          transformStyle: config.enable3D ? "preserve-3d" : undefined,
          background: config.enableGlassmorphism
            ? "rgba(255,255,255,0.03)"
            : "rgba(20,20,20,0.9)",
          backdropFilter: config.enableGlassmorphism ? "blur(16px)" : undefined,
          border: config.enableNeonBorders
            ? `1px solid rgba(${accentColor},0.35)`
            : `1px solid rgba(${accentColor},0.2)`,
          boxShadow: config.enable3D
            ? `0 ${config.card3DLift * 1.5}px ${config.card3DLift * 3}px -${config.card3DLift * 0.75}px rgba(${accentColor},0.25)`
            : undefined,
        }}
        onMouseMove={handleMouse}
        onMouseLeave={resetMouse}
        whileHover={config.enableAnimations ? {
          scale: 1.02,
          z: config.card3DLift,
        } : undefined}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative group rounded-2xl overflow-hidden cursor-pointer"
      >
        {/* Hover glow layer */}
        {config.enableGlowEffects && (
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, rgba(${accentColor},0.12), transparent 70%)`,
              boxShadow: `0 0 30px rgba(${accentColor},0.2), inset 0 0 30px rgba(${accentColor},0.05)`,
            }}
          />
        )}

        {/* Holographic shine for epic/ultra */}
        {config.enableHolographicShine && (
          <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden z-10">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)",
                backgroundSize: "200% 100%",
                animation: "holoShine 2s ease-in-out infinite",
              }}
            />
          </div>
        )}

        {/* Featured badge */}
        {mod.featured && (
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
            style={{ background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.4)", color: "#4ade80" }}>
            <Star className="w-2.5 h-2.5 fill-current" /> Featured
          </div>
        )}

        {/* Category badge */}
        <div className={`absolute top-3 right-3 z-20 px-2 py-0.5 rounded-full text-[10px] font-bold ${
          isJava ? "text-blue-300" : "text-purple-300"
        }`}
          style={{
            background: isJava ? "rgba(59,130,246,0.15)" : "rgba(168,85,247,0.15)",
            border: isJava ? "1px solid rgba(59,130,246,0.3)" : "1px solid rgba(168,85,247,0.3)",
          }}>
          {isJava ? "☕ Java" : "📱 Bedrock"}
        </div>

        {/* Image or placeholder */}
        {mod.imageUrl ? (
          <div className="relative overflow-hidden h-36">
            <motion.img
              src={mod.imageUrl}
              alt={mod.name}
              className="w-full h-full object-cover"
              whileHover={config.enableAnimations ? { scale: 1.08 } : undefined}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
        ) : (
          <div className="h-36 flex items-center justify-center relative overflow-hidden"
            style={{ background: isJava ? "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(0,0,0,0.9))" : "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(0,0,0,0.9))" }}>
            <motion.span
              className="text-5xl z-10"
              whileHover={config.enableAnimations ? { scale: 1.2, rotate: 10 } : undefined}
              style={config.enable3D ? { transform: "translateZ(15px)" } : {}}
            >
              {isJava ? "☕" : "📱"}
            </motion.span>
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "linear-gradient(rgba(74,222,128,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.3) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          </div>
        )}

        <div className="p-4" style={config.enable3D ? { transform: "translateZ(8px)" } : {}}>
          <h3 className="font-bold text-white text-base leading-tight mb-1">{mod.name}</h3>
          <p className="text-zinc-400 text-sm line-clamp-2 mb-3 leading-relaxed">{mod.description}</p>

          <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
            <span className="font-mono">v{mod.version}</span>
            <span className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              {downloads.toLocaleString()}
            </span>
            <span className="ml-auto truncate">by {mod.author}</span>
          </div>

          {mod.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {mod.tags.slice(0, 3).map((t) => (
                <span key={t} className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded font-medium"
                  style={{ background: "rgba(74,222,128,0.08)", color: "#6ee7b7", border: "1px solid rgba(74,222,128,0.15)" }}>
                  <Tag className="w-2.5 h-2.5" />{t}
                </span>
              ))}
            </div>
          )}

          <motion.a
            href={mod.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDownloadClick}
            whileHover={config.enableAnimations ? { scale: 1.02 } : undefined}
            whileTap={config.enableAnimations ? { scale: 0.97 } : undefined}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-sm"
            style={{
              background: "rgba(74,222,128,0.1)",
              border: config.enableNeonBorders
                ? "1px solid rgba(74,222,128,0.5)"
                : "1px solid rgba(74,222,128,0.3)",
              color: "#4ade80",
            }}
            onHoverStart={(e) => {
              if (!config.enableGlowEffects) return;
              const el = e.target as HTMLElement;
              el.style.boxShadow = "0 0 20px rgba(74,222,128,0.35)";
              el.style.background = "rgba(74,222,128,0.18)";
            }}
            onHoverEnd={(e) => {
              if (!config.enableGlowEffects) return;
              const el = e.target as HTMLElement;
              el.style.boxShadow = "none";
              el.style.background = "rgba(74,222,128,0.1)";
            }}
          >
            <Zap className="w-4 h-4" />
            Download
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}
