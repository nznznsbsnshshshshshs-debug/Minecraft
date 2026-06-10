import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import YouTube from "@/pages/youtube";
import Mods from "@/pages/mods";
import JavaMods from "@/pages/java-mods";
import BedrockMods from "@/pages/bedrock-mods";
import Socials from "@/pages/socials";
import Admin from "@/pages/admin";
import BottomNav from "@/components/bottom-nav";
import LoadingScreen from "@/components/loading-screen";
import ParticleBg from "@/components/particle-bg";
import WorldSettings from "@/components/world-settings";
import Ultra3DWrapper from "@/components/ultra-3d-wrapper";
import { usePerformanceConfig } from "@/lib/performance";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000, retry: 1 } },
});

function AnimatedRoutes() {
  const [location] = useLocation();
  const config = usePerformanceConfig();

  return (
    <AnimatePresence mode="wait">
      <Switch key={location} location={location}>
        <Route path="/" component={Home} />
        <Route path="/mods" component={Mods} />
        <Route path="/mods/java" component={JavaMods} />
        <Route path="/mods/bedrock" component={BedrockMods} />
        <Route path="/youtube" component={YouTube} />
        <Route path="/socials" component={Socials} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function Router() {
  const config = usePerformanceConfig();

  return (
    <Ultra3DWrapper>
      <ParticleBg />
      <AnimatedRoutes />
      <BottomNav />
      <WorldSettings />

      {/* Floating orbs for cinematic/ultra */}
      {config.enableFloatingOrbs && (
        <>
          <div className="fixed top-1/4 -left-20 w-64 h-64 rounded-full pointer-events-none z-0"
            style={{
              background: "radial-gradient(circle, rgba(74,222,128,0.08), transparent 70%)",
              filter: "blur(60px)",
              animation: "ultraFloat 10s ease-in-out infinite",
            }} />
          <div className="fixed bottom-1/3 -right-16 w-48 h-48 rounded-full pointer-events-none z-0"
            style={{
              background: "radial-gradient(circle, rgba(34,211,238,0.06), transparent 70%)",
              filter: "blur(40px)",
              animation: "ultraFloat 8s ease-in-out infinite reverse",
            }} />
        </>
      )}

      {/* Scanlines overlay for ultra */}
      {config.enableScanlines && (
        <div
          className="ultra-scanlines fixed inset-0 pointer-events-none z-[90]"
          aria-hidden
        />
      )}

      {/* Rainbow cursor trail for ultra/epic */}
      {config.enableRainbowCursor && <RainbowCursorTrail />}
    </Ultra3DWrapper>
  );
}

// Simple rainbow cursor trail component
function RainbowCursorTrail() {
  // We use a canvas-based approach for performance
  // This is a lightweight implementation
  return null; // CSS-only cursor trail via index.css
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
          {loaded && <Router />}
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
