import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePerformanceConfig } from "@/lib/performance";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const config = usePerformanceConfig();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"boot" | "done">("boot");
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const steps = config.enableAnimations
      ? [15, 35, 55, 72, 88, 100]
      : [100];
    let i = 0;
    const tick = () => {
      if (i < steps.length) {
        setProgress(steps[i]);
        if (steps[i] === 100) {
          setTimeout(() => { setPhase("done"); setTimeout(onDone, 400); }, 300);
        }
        i++;
        setTimeout(tick, config.enableAnimations ? i * 120 + 80 : 100);
      }
    };
    const t = setTimeout(tick, 200);

    if (config.enableAnimations) {
      const glitchInterval = setInterval(() => setGlitch(true), 800);
      const glitchOff = setInterval(() => setGlitch(false), 900);
      return () => {
        clearTimeout(t);
        clearInterval(glitchInterval);
        clearInterval(glitchOff);
      };
    }
    return () => clearTimeout(t);
  }, [onDone, config.enableAnimations]);

  return (
    <AnimatePresence>
      {phase === "boot" && (
        <motion.div
          className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center"
          exit={config.enable3DPageTransition
            ? { opacity: 0, rotateY: -90, scale: 0.8 }
            : { opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={config.enable3D ? { perspective: 1200, transformStyle: "preserve-3d" } : {}}
        >
          {/* Scanlines - only for cinematic/ultra */}
          {config.enableScanlines && (
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)" }} />
          )}

          {/* Corner brackets */}
          {config.enableAnimations && (
            <>
              {[["top-8 left-8", "border-t-2 border-l-2"], ["top-8 right-8", "border-t-2 border-r-2"],
                ["bottom-8 left-8", "border-b-2 border-l-2"], ["bottom-8 right-8", "border-b-2 border-r-2"]].map(([pos, border], i) => (
                <div key={i} className={`absolute ${pos} w-8 h-8 ${border} border-green-400/60`} />
              ))}
            </>
          )}

          <div className="relative text-center px-8 w-full max-w-sm">
            {/* Logo */}
            <motion.div
              initial={config.enableAnimations ? { scale: 0.8, opacity: 0 } : undefined}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "backOut" }}
              className="mb-8"
              style={config.enable3D ? { transformStyle: "preserve-3d" } : {}}
            >
              <div className="text-6xl mb-3" style={config.enable3D ? { transform: "translateZ(40px)" } : {}}>⚡</div>
              <h1
                className="text-4xl font-black tracking-widest uppercase"
                style={{
                  color: glitch ? "#ff0" : "#4ade80",
                  textShadow: glitch
                    ? "2px 0 #f00, -2px 0 #0ff, 0 0 20px #4ade80"
                    : config.enableGlowEffects
                      ? "0 0 30px rgba(74,222,128,0.8), 0 0 60px rgba(74,222,128,0.4)"
                      : "none",
                  transform: glitch ? "skewX(-2deg)" : config.enable3D ? "translateZ(30px)" : "none",
                  transition: "color 0.05s, transform 0.05s",
                }}
              >
                YGP
              </h1>
              <p className="text-green-400/60 text-xs tracking-[0.3em] uppercase mt-1 font-mono">
                Minecraft Hub
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-full h-0.5 bg-zinc-800 rounded-full overflow-hidden mb-2">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #4ade80, #22d3ee)",
                  boxShadow: config.enableGlowEffects ? "0 0 10px #4ade80" : "none",
                }}
                animate={{ width: `${progress}%` }}
                transition={config.enableAnimations ? { duration: 0.3, ease: "easeOut" } : { duration: 0 }}
              />
            </div>
            <p className="text-green-400/50 text-xs font-mono tracking-widest">
              LOADING SYSTEM... {progress}%
            </p>

            {/* Boot lines */}
            {config.enableAnimations && (
              <div className="mt-6 space-y-1 text-left font-mono text-[10px] text-green-400/30">
                {progress >= 15 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{">"} Initializing core modules...</motion.div>}
                {progress >= 35 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{">"} Loading mod database...</motion.div>}
                {progress >= 55 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{">"} Connecting YGP network...</motion.div>}
                {progress >= 72 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{">"} Syncing content feeds...</motion.div>}
                {progress >= 88 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{">"} Launching interface...</motion.div>}
                {progress >= 100 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400">{">"} SYSTEM READY ✓</motion.div>}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
