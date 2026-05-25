import { Link } from "wouter";
import { Sword, Youtube, ChevronRight, Zap, Shield, Star } from "lucide-react";
import ParticleBg from "@/components/particle-bg";
import { useListMods } from "@workspace/api-client-react";

export default function Home() {
  const { data: mods } = useListMods({ featured: "true" });
  const featured = (mods ?? []).slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <ParticleBg count={35} />

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-16 pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.18),transparent_65%)]" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-400/30 text-green-300 text-xs px-3 py-1.5 rounded-full mb-5 font-medium">
            <Zap className="w-3.5 h-3.5" />
            YGP Minecraft Universe
          </div>
          <h1 className="text-4xl sm:text-6xl font-black mb-4 leading-tight">
            <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent [filter:drop-shadow(0_0_30px_rgba(74,222,128,0.4))]">
              YGP Minecraft
            </span>
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Futuristic mods, addons, creator content, and cinematic Minecraft experiences — all in one hub.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/mods"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-green-500 hover:bg-green-400 transition-all duration-200 font-bold text-base shadow-[0_0_20px_rgba(74,222,128,0.4)] hover:shadow-[0_0_30px_rgba(74,222,128,0.6)]"
            >
              <Sword className="w-4 h-4" />
              Explore Mods
            </Link>
            <Link
              href="/youtube"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-zinc-700 hover:border-green-400/60 transition-all duration-200 font-bold text-base hover:bg-zinc-900/60"
            >
              <Youtube className="w-4 h-4" />
              Watch Videos
            </Link>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="relative z-10 px-5 pb-8">
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "☕", title: "Java Mods", desc: "Shaders, textures, gameplay upgrades", href: "/mods/java", color: "blue" },
            { icon: "📱", title: "Bedrock Addons", desc: "PE addons, RTX packs, mobile content", href: "/mods/bedrock", color: "purple" },
            { icon: "🎬", title: "YGP Studio", desc: "YouTube, Shorts, cinematic content", href: "/youtube", color: "red" },
          ].map(({ icon, title, desc, href, color }) => (
            <Link key={href} href={href}>
              <div className={`glass-card rounded-2xl p-5 border cursor-pointer group transition-all duration-300 hover:shadow-[0_0_20px_rgba(74,222,128,0.15)] ${
                color === "blue" ? "border-blue-500/20 hover:border-blue-400/50" :
                color === "purple" ? "border-purple-500/20 hover:border-purple-400/50" :
                "border-red-500/20 hover:border-red-400/50"
              }`}>
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className={`font-bold text-base mb-1 ${
                  color === "blue" ? "text-blue-300" : color === "purple" ? "text-purple-300" : "text-red-300"
                }`}>{title}</h3>
                <p className="text-zinc-400 text-sm leading-snug">{desc}</p>
                <div className="flex items-center gap-1 mt-3 text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  Explore <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured mods */}
      {featured.length > 0 && (
        <section className="relative z-10 px-5 pb-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                Featured Mods
              </h2>
              <Link href="/mods" className="text-sm text-green-400 hover:text-green-300 flex items-center gap-1">
                All mods <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {featured.map((mod) => (
                <div key={mod.id} className="glass-card rounded-2xl p-4 border border-green-500/20">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-sm text-white">{mod.name}</h3>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border shrink-0 ${
                      mod.category === "java" ? "border-blue-400/30 text-blue-300" : "border-purple-400/30 text-purple-300"
                    }`}>{mod.category}</span>
                  </div>
                  <p className="text-zinc-400 text-xs line-clamp-2 mb-3">{mod.description}</p>
                  <a href={mod.downloadUrl} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1">
                    Download <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats strip */}
      <section className="relative z-10 px-5 pb-4">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-2xl border border-green-500/10 px-6 py-4 grid grid-cols-3 divide-x divide-zinc-800">
            {[
              { label: "Mods", value: "50+" },
              { label: "Downloads", value: "10K+" },
              { label: "Channels", value: "5" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center px-4">
                <div className="text-xl font-black text-green-400">{value}</div>
                <div className="text-xs text-zinc-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
