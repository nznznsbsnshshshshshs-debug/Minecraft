import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Zap, Battery, Monitor, Sparkles, Sun, CloudRain, CloudLightning, Snowflake, X } from "lucide-react";
import { usePerformance, type PerformanceMode } from "@/lib/performance";

const MODES: { key: PerformanceMode; label: string; icon: React.ReactNode; desc: string; color: string }[] = [
  { key: "low", label: "Low", icon: <Battery className="w-4 h-4" />, desc: "No 3D, battery saver", color: "#ef4444" },
  { key: "normal", label: "Normal", icon: <Monitor className="w-4 h-4" />, desc: "Basic effects", color: "#eab308" },
  { key: "cinematic", label: "Cinematic", icon: <Sparkles className="w-4 h-4" />, desc: "3D world + animations", color: "#3b82f6" },
  { key: "ultra", label: "Ultra", icon: <Zap className="w-4 h-4" />, desc: "Everything enabled", color: "#a855f7" },
];

const WEATHERS = [
  { key: "sunny", label: "Sunny", icon: <Sun className="w-3.5 h-3.5" /> },
  { key: "rain", label: "Rain", icon: <CloudRain className="w-3.5 h-3.5" /> },
  { key: "storm", label: "Storm", icon: <CloudLightning className="w-3.5 h-3.5" /> },
  { key: "snow", label: "Snow", icon: <Snowflake className="w-3.5 h-3.5" /> },
];

export default function WorldSettings() {
  const { mode, setMode, epic, setEpic, config } = usePerformance();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-3 z-[100] w-11 h-11 rounded-xl flex items-center justify-center"
        style={{
          background: "rgba(0,0,0,0.85)",
          border: "1px solid rgba(74,222,128,0.25)",
          backdropFilter: "blur(16px)",
        }}
        whileHover={{ scale: 1.1, borderColor: "rgba(74,222,128,0.6)" }}
        whileTap={{ scale: 0.95 }}
      >
        <Settings className="w-5 h-5 text-green-400" />
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-20 right-3 z-[101] w-72 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(5,5,5,0.96)",
              border: "1px solid rgba(74,222,128,0.2)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 0 40px rgba(74,222,128,0.08), 0 20px 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-3 pb-2">
              <span className="text-xs font-bold text-green-400 tracking-widest uppercase flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5" /> World Settings
              </span>
              <button onClick={() => setOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Performance Modes */}
            <div className="px-3 pb-2">
              <p className="text-[9px] text-zinc-500 uppercase tracking-widest mb-2 px-1">Performance</p>
              <div className="grid grid-cols-2 gap-1.5">
                {MODES.map((m) => {
                  const active = mode === m.key;
                  return (
                    <motion.button
                      key={m.key}
                      onClick={() => setMode(m.key)}
                      className="relative flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-colors"
                      style={{
                        background: active ? `${m.color}15` : "rgba(255,255,255,0.03)",
                        border: active ? `1px solid ${m.color}50` : "1px solid rgba(255,255,255,0.06)",
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span style={{ color: active ? m.color : "#71717a" }}>{m.icon}</span>
                      <div>
                        <div className="text-[11px] font-bold" style={{ color: active ? m.color : "#a1a1aa" }}>
                          {m.label}
                        </div>
                        <div className="text-[8px] text-zinc-500 leading-tight">{m.desc}</div>
                      </div>
                      {active && (
                        <motion.div
                          layoutId="mode-indicator"
                          className="absolute -top-px -right-px w-2.5 h-2.5 rounded-bl-lg rounded-tr-lg"
                          style={{ background: m.color }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Epic Mode Toggle */}
            <div className="px-3 pb-2">
              <motion.button
                onClick={() => setEpic(!epic)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg"
                style={{
                  background: epic ? "rgba(168,85,247,0.12)" : "rgba(255,255,255,0.03)",
                  border: epic ? "1px solid rgba(168,85,247,0.4)" : "1px solid rgba(255,255,255,0.06)",
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: epic ? "linear-gradient(135deg, #a855f7, #ec4899)" : "rgba(255,255,255,0.06)",
                    boxShadow: epic ? "0 0 20px rgba(168,85,247,0.5)" : "none",
                  }}
                >
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-[11px] font-bold" style={{ color: epic ? "#c084fc" : "#a1a1aa" }}>
                    Epic Mode {epic ? "ON" : "OFF"}
                  </div>
                  <div className="text-[8px] text-zinc-500">Run on top of any mode</div>
                </div>
                {/* Toggle switch */}
                <div
                  className="w-8 h-4.5 rounded-full relative transition-colors"
                  style={{ background: epic ? "#a855f7" : "rgba(255,255,255,0.1)" }}
                >
                  <motion.div
                    className="absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white"
                    animate={{ left: epic ? 16 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </div>
              </motion.button>
            </div>

            {/* Weather */}
            <div className="px-3 pb-3">
              <p className="text-[9px] text-zinc-500 uppercase tracking-widest mb-2 px-1">Weather</p>
              <div className="flex gap-1.5">
                {WEATHERS.map((w) => (
                  <button
                    key={w.key}
                    className="flex-1 flex flex-col items-center gap-1 py-1.5 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <span className="text-zinc-400">{w.icon}</span>
                    <span className="text-[8px] text-zinc-500">{w.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active mode info */}
            <div
              className="px-3 py-2"
              style={{ background: "rgba(0,0,0,0.3)", borderTop: "1px solid rgba(255,255,255,0.04)" }}
            >
              <p className="text-[8px] text-zinc-500 font-mono">
                Mode: <span className="text-green-400">{mode.toUpperCase()}</span>
                {epic && <span className="text-purple-400"> + EPIC</span>}
                {" "} | Particles: {config.particleCount} | 3D: {config.enable3D ? "ON" : "OFF"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
