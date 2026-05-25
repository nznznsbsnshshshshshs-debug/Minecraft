import { useLocation } from "wouter";
import { Home, Sword, Youtube, Share2, ShieldCheck } from "lucide-react";

const NAV = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/mods", icon: Sword, label: "Mods" },
  { href: "/youtube", icon: Youtube, label: "Videos" },
  { href: "/socials", icon: Share2, label: "Socials" },
  { href: "/admin", icon: ShieldCheck, label: "Admin" },
];

export default function BottomNav() {
  const [location, navigate] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-black/80 backdrop-blur-xl border-t border-green-500/20 h-16 px-2 safe-area-pb">
      {NAV.map(({ href, icon: Icon, label }) => {
        const active = location === href || (href !== "/" && location.startsWith(href));
        return (
          <button
            key={href}
            onClick={() => navigate(href)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all duration-200 ${
              active
                ? "text-green-400 [filter:drop-shadow(0_0_8px_rgba(74,222,128,0.8))]"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
