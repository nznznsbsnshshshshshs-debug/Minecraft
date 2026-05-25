import { useLocation } from "wouter";
import { Home, Sword, Youtube, Share2 } from "lucide-react";
import { motion } from "framer-motion";

const NAV = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/mods", icon: Sword, label: "Mods" },
  { href: "/youtube", icon: Youtube, label: "Videos" },
  { href: "/socials", icon: Share2, label: "Socials" },
];

export default function BottomNav() {
  const [location, navigate] = useLocation();

  const activeIdx = NAV.findIndex(({ href }) =>
    href === "/" ? location === "/" : location.startsWith(href)
  );

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 h-16 safe-area-pb"
      style={{
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(74,222,128,0.12)",
      }}
    >
      <div className="relative flex items-stretch h-full max-w-lg mx-auto">
        {activeIdx >= 0 && (
          <motion.div
            className="absolute top-2 bottom-2 rounded-xl pointer-events-none"
            style={{
              width: `${100 / NAV.length}%`,
              background: "rgba(74,222,128,0.08)",
              border: "1px solid rgba(74,222,128,0.25)",
            }}
            animate={{ left: `${(activeIdx / NAV.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}

        {NAV.map(({ href, icon: Icon, label }, idx) => {
          const active = idx === activeIdx;
          return (
            <button
              key={href}
              onClick={() => navigate(href)}
              className="relative flex flex-col items-center justify-center gap-0.5 flex-1 py-1"
            >
              <motion.div
                animate={active ? { scale: 1.15 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Icon
                  className="w-5 h-5"
                  style={{
                    color: active ? "#4ade80" : "#52525b",
                    filter: active ? "drop-shadow(0 0 8px rgba(74,222,128,0.9))" : "none",
                    transition: "color 0.2s, filter 0.2s",
                  }}
                />
              </motion.div>
              <span
                className="text-[9px] font-semibold tracking-wide"
                style={{ color: active ? "#4ade80" : "#52525b", transition: "color 0.2s" }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
