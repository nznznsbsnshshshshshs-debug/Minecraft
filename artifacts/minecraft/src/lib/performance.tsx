import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ── Performance Modes ──────────────────────────────────────────────
export type PerformanceMode = "low" | "normal" | "cinematic" | "ultra";

export interface PerformanceConfig {
  // Particles
  enableParticles: boolean;
  particleCount: number;
  particleRGB: boolean;
  particleConnections: boolean;
  particleGlow: boolean;
  particleOpacity: number;

  // Animations
  enableAnimations: boolean;
  animationSpeed: number;       // 0‑1  (1 = full spring)
  enablePageTransitions: boolean;
  enableScrollReveal: boolean;

  // 3D
  enable3D: boolean;
  perspective3D: number;
  card3DTilt: boolean;
  card3DLift: number;           // px lift on hover
  enable3DNavbar: boolean;
  enable3DPageTransition: boolean;
  enable3DWorldWrap: boolean;   // ultra: whole site 3D mouse-follow

  // Visual effects
  enableGlowEffects: boolean;
  enableNeonBorders: boolean;
  enableGlassmorphism: boolean;
  enableHolographicShine: boolean;
  enableScanlines: boolean;
  enableFloatingOrbs: boolean;
  enableRainbowCursor: boolean;

  // Epic overlay (additive)
  epicParticleBoost: number;    // extra particles
  epic3DBoost: boolean;
  epicHolographic: boolean;
  epicSpeedBoost: number;
}

const CONFIGS: Record<PerformanceMode, PerformanceConfig> = {
  low: {
    enableParticles: false,
    particleCount: 0,
    particleRGB: false,
    particleConnections: false,
    particleGlow: false,
    particleOpacity: 0,
    enableAnimations: false,
    animationSpeed: 0,
    enablePageTransitions: false,
    enableScrollReveal: false,
    enable3D: false,
    perspective3D: 0,
    card3DTilt: false,
    card3DLift: 0,
    enable3DNavbar: false,
    enable3DPageTransition: false,
    enable3DWorldWrap: false,
    enableGlowEffects: false,
    enableNeonBorders: false,
    enableGlassmorphism: false,
    enableHolographicShine: false,
    enableScanlines: false,
    enableFloatingOrbs: false,
    enableRainbowCursor: false,
    epicParticleBoost: 0,
    epic3DBoost: false,
    epicHolographic: false,
    epicSpeedBoost: 0,
  },
  normal: {
    enableParticles: true,
    particleCount: 30,
    particleRGB: false,
    particleConnections: false,
    particleGlow: true,
    particleOpacity: 0.4,
    enableAnimations: true,
    animationSpeed: 0.6,
    enablePageTransitions: true,
    enableScrollReveal: true,
    enable3D: false,
    perspective3D: 0,
    card3DTilt: false,
    card3DLift: 0,
    enable3DNavbar: false,
    enable3DPageTransition: false,
    enable3DWorldWrap: false,
    enableGlowEffects: true,
    enableNeonBorders: false,
    enableGlassmorphism: false,
    enableHolographicShine: false,
    enableScanlines: false,
    enableFloatingOrbs: false,
    enableRainbowCursor: false,
    epicParticleBoost: 0,
    epic3DBoost: false,
    epicHolographic: false,
    epicSpeedBoost: 0,
  },
  cinematic: {
    enableParticles: true,
    particleCount: 70,
    particleRGB: true,
    particleConnections: true,
    particleGlow: true,
    particleOpacity: 0.7,
    enableAnimations: true,
    animationSpeed: 0.85,
    enablePageTransitions: true,
    enableScrollReveal: true,
    enable3D: true,
    perspective3D: 800,
    card3DTilt: true,
    card3DLift: 10,
    enable3DNavbar: false,
    enable3DPageTransition: false,
    enable3DWorldWrap: false,
    enableGlowEffects: true,
    enableNeonBorders: true,
    enableGlassmorphism: true,
    enableHolographicShine: false,
    enableScanlines: false,
    enableFloatingOrbs: true,
    enableRainbowCursor: false,
    epicParticleBoost: 0,
    epic3DBoost: false,
    epicHolographic: false,
    epicSpeedBoost: 0,
  },
  ultra: {
    enableParticles: true,
    particleCount: 150,
    particleRGB: true,
    particleConnections: true,
    particleGlow: true,
    particleOpacity: 0.9,
    enableAnimations: true,
    animationSpeed: 1,
    enablePageTransitions: true,
    enableScrollReveal: true,
    enable3D: true,
    perspective3D: 1200,
    card3DTilt: true,
    card3DLift: 20,
    enable3DNavbar: true,
    enable3DPageTransition: true,
    enable3DWorldWrap: true,
    enableGlowEffects: true,
    enableNeonBorders: true,
    enableGlassmorphism: true,
    enableHolographicShine: true,
    enableScanlines: true,
    enableFloatingOrbs: true,
    enableRainbowCursor: true,
    epicParticleBoost: 0,
    epic3DBoost: false,
    epicHolographic: false,
    epicSpeedBoost: 0,
  },
};

// ── Device detection ───────────────────────────────────────────────
export function detectDevicePerformance(): PerformanceMode {
  if (typeof window === "undefined") return "normal";
  const ua = navigator.userAgent.toLowerCase();
  const isMobile = /android|iphone|ipad|ipod|mobile/.test(ua);
  if (isMobile) return "low";
  const cores = navigator.hardwareConcurrency || 2;
  const mem = (navigator as any).deviceMemory as number | undefined;
  if (cores <= 2 || (mem !== undefined && mem <= 2)) return "low";
  if (cores <= 4 || (mem !== undefined && mem <= 4)) return "normal";
  if (cores <= 6) return "cinematic";
  return "ultra";
}

// ── Context ────────────────────────────────────────────────────────
interface PerformanceContextValue {
  mode: PerformanceMode;
  setMode: (m: PerformanceMode) => void;
  epic: boolean;
  setEpic: (v: boolean) => void;
  config: PerformanceConfig;
}

const PerformanceContext = createContext<PerformanceContextValue | null>(null);

export function usePerformance() {
  const ctx = useContext(PerformanceContext);
  if (!ctx) throw new Error("usePerformance must be used inside PerformanceProvider");
  return ctx;
}

export function usePerformanceConfig() {
  return usePerformance().config;
}

// ── Provider ───────────────────────────────────────────────────────
export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [mode, setModeRaw] = useState<PerformanceMode>(() => {
    try {
      const saved = localStorage.getItem("ygp-perf-mode") as PerformanceMode | null;
      if (saved && CONFIGS[saved]) return saved;
    } catch {}
    return detectDevicePerformance();
  });

  const [epic, setEpicRaw] = useState<boolean>(() => {
    try {
      return localStorage.getItem("ygp-epic") === "true";
    } catch {}
    return false;
  });

  const setMode = (m: PerformanceMode) => {
    setModeRaw(m);
    try { localStorage.setItem("ygp-perf-mode", m); } catch {}
  };

  const setEpic = (v: boolean) => {
    setEpicRaw(v);
    try { localStorage.setItem("ygp-epic", v ? "true" : "false"); } catch {}
  };

  // Build merged config: base mode + epic overlay
  const base = CONFIGS[mode];
  const config: PerformanceConfig = epic
    ? {
        ...base,
        particleCount: base.particleCount + 60,
        particleRGB: true,
        particleConnections: true,
        particleGlow: true,
        particleOpacity: Math.min(base.particleOpacity + 0.2, 1),
        enableGlowEffects: true,
        enableNeonBorders: true,
        enableHolographicShine: true,
        enableRainbowCursor: true,
        enableFloatingOrbs: true,
        card3DLift: Math.max(base.card3DLift, 15),
        epicParticleBoost: 60,
        epic3DBoost: !base.enable3D,
        epicHolographic: true,
        epicSpeedBoost: 0.15,
        enable3D: base.enable3D || true,
        card3DTilt: true,
        perspective3D: Math.max(base.perspective3D, 800),
      }
    : base;

  return (
    <PerformanceContext.Provider value={{ mode, setMode, epic, setEpic, config }}>
      {children}
    </PerformanceContext.Provider>
  );
}
