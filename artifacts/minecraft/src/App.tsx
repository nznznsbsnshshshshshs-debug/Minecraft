import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import YouTube from "@/pages/youtube";
import Mods from "@/pages/mods";
import JavaMods from "@/pages/java-mods";
import BedrockMods from "@/pages/bedrock-mods";
import Socials from "@/pages/socials";
import Admin from "@/pages/admin";
import BottomNav from "@/components/bottom-nav";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000, retry: 1 } },
});

function Router() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/mods" component={Mods} />
        <Route path="/mods/java" component={JavaMods} />
        <Route path="/mods/bedrock" component={BedrockMods} />
        <Route path="/youtube" component={YouTube} />
        <Route path="/socials" component={Socials} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
      <BottomNav />
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
