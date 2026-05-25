import { Download, Tag, Star } from "lucide-react";

interface Mod {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  downloadUrl: string;
  imageUrl?: string | null;
  downloads: number;
  featured: boolean;
  author: string;
  tags: string[];
}

export default function ModCard({ mod }: { mod: Mod }) {
  return (
    <div className="relative group glass-card rounded-2xl overflow-hidden border border-green-500/20 hover:border-green-400/60 transition-all duration-300 hover:shadow-[0_0_24px_rgba(74,222,128,0.2)]">
      {mod.featured && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-green-500/20 border border-green-400/40 text-green-300 text-xs px-2 py-0.5 rounded-full">
          <Star className="w-3 h-3 fill-green-400" />
          Featured
        </div>
      )}

      {mod.imageUrl ? (
        <img
          src={mod.imageUrl}
          alt={mod.name}
          className="w-full h-36 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
      ) : (
        <div className="w-full h-36 bg-gradient-to-br from-green-900/40 to-black flex items-center justify-center">
          <span className="text-4xl">⚔️</span>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-white text-base leading-tight">{mod.name}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${
            mod.category === "java"
              ? "bg-blue-500/10 border-blue-400/30 text-blue-300"
              : "bg-purple-500/10 border-purple-400/30 text-purple-300"
          }`}>
            {mod.category === "java" ? "Java" : "Bedrock"}
          </span>
        </div>

        <p className="text-zinc-400 text-sm line-clamp-2 mb-3">{mod.description}</p>

        <div className="flex items-center justify-between text-xs text-zinc-500 mb-3">
          <span>v{mod.version}</span>
          <span className="flex items-center gap-1">
            <Download className="w-3 h-3" />
            {mod.downloads.toLocaleString()}
          </span>
          <span>by {mod.author}</span>
        </div>

        {mod.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {mod.tags.slice(0, 3).map((t) => (
              <span key={t} className="flex items-center gap-0.5 text-[10px] bg-zinc-800/60 text-zinc-400 px-1.5 py-0.5 rounded">
                <Tag className="w-2.5 h-2.5" />{t}
              </span>
            ))}
          </div>
        )}

        <a
          href={mod.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-green-500/10 hover:bg-green-500/20 border border-green-400/30 hover:border-green-400/60 text-green-300 font-semibold text-sm transition-all duration-200 hover:shadow-[0_0_12px_rgba(74,222,128,0.3)]"
        >
          <Download className="w-4 h-4" />
          Download
        </a>
      </div>
    </div>
  );
}
