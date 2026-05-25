import { Link } from "wouter";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.2),transparent_60%)]" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            YGP Minecraft
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Futuristic Minecraft mods, addons,
            creator content, and cinematic gaming UI.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/mods"
              className="px-8 py-4 rounded-2xl bg-green-500 hover:bg-green-400 transition font-bold text-lg"
            >
              Explore Mods
            </a>

            <Link
              href="/youtube"
              className="px-8 py-4 rounded-2xl border border-zinc-700 hover:border-green-400 transition font-bold text-lg"
            >
              Watch Videos
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-green-400 mb-3">
              Java Mods
            </h2>

            <p className="text-zinc-400">
              Explore futuristic Java Edition mods,
              shaders, textures, and gameplay upgrades.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-green-400 mb-3">
              Bedrock Addons
            </h2>

            <p className="text-zinc-400">
              Download PE addons, RTX packs,
              survival tools, and mobile content.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-green-400 mb-3">
              YGP Studio
            </h2>

            <p className="text-zinc-400">
              Creator ecosystem, YouTube uploads,
              Shorts, and cinematic creator content.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
