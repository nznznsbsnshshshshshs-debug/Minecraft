import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000, retry: 1 } },
});

function AnimatedRoutes() {
  const [location] = useLocation();
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
  return (
    <>
      <AnimatedRoutes />
      <BottomNav />
    </>
  );
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
