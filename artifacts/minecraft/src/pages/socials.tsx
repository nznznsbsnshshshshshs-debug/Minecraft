import { ExternalLink } from "lucide-react";

const SOCIALS = [
  {
    platform: "YouTube",
    emoji: "📺",
    channels: [
      { name: "Yojit Gaming Pro", url: "https://youtube.com/@yojitgamingpro", desc: "Main gaming channel" },
      { name: "YGP Minecraft", url: "https://youtube.com/@ygpminecraft", desc: "Minecraft content" },
      { name: "YGP Countryballs", url: "https://youtube.com/@ygpcountryballs", desc: "Countryballs series" },
      { name: "YGP Tech", url: "https://youtube.com/@ygptech_official", desc: "Tech videos & tutorials" },
      { name: "Yojit Art & Music", url: "https://youtube.com/@yojitartandmusic", desc: "Creative content" },
    ],
    color: "red",
  },
];

const colorMap: Record<string, string> = {
  red: "border-red-500/20 hover:border-red-400/50 hover:shadow-[0_0_16px_rgba(239,68,68,0.15)]",
  green: "border-green-500/20 hover:border-green-400/50 hover:shadow-[0_0_16px_rgba(74,222,128,0.15)]",
  blue: "border-blue-500/20 hover:border-blue-400/50 hover:shadow-[0_0_16px_rgba(59,130,246,0.15)]",
};
const labelMap: Record<string, string> = {
  red: "text-red-400",
  green: "text-green-400",
  blue: "text-blue-400",
};

export default function Socials() {
  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="relative overflow-hidden px-5 pt-12 pb-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.10),transparent_60%)]" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-2xl font-black mb-1">Socials</h1>
          <p className="text-zinc-400 text-sm">Find YGP across all platforms.</p>
        </div>
      </div>

      <div className="px-5 max-w-2xl mx-auto space-y-8">
        {SOCIALS.map(({ platform, emoji, channels, color }) => (
          <div key={platform}>
            <h2 className={`text-lg font-bold flex items-center gap-2 mb-4 ${labelMap[color]}`}>
              <span>{emoji}</span> {platform}
            </h2>
            <div className="space-y-3">
              {channels.map(({ name, url, desc }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-4 glass-card rounded-2xl border transition-all duration-300 group ${colorMap[color]}`}
                >
                  <div>
                    <div className="font-semibold text-sm text-white group-hover:text-green-300 transition-colors">{name}</div>
                    <div className="text-xs text-zinc-500 mt-0.5">{desc}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors shrink-0 ml-3" />
                </a>
              ))}
            </div>
          </div>
        ))}

        <div className="glass-card rounded-2xl border border-green-500/10 p-6 text-center">
          <div className="text-3xl mb-3">🎮</div>
          <h3 className="font-bold text-white mb-2">Join the Community</h3>
          <p className="text-zinc-400 text-sm">More social links coming soon. Stay tuned for Discord and more!</p>
        </div>
      </div>
    </div>
  );
}
