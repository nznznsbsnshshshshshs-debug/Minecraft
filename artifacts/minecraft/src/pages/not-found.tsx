import { Link } from "wouter";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-5 pb-20">
      <div className="text-center">
        <div className="text-7xl font-black text-green-400 mb-2 [filter:drop-shadow(0_0_30px_rgba(74,222,128,0.4))]">404</div>
        <h1 className="text-xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-zinc-500 text-sm mb-6">This dimension doesn't exist in the YGP universe.</p>
        <Link href="/">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500/10 border border-green-400/30 text-green-300 font-semibold text-sm hover:bg-green-500/20 transition-all">
            <Home className="w-4 h-4" /> Go Home
          </span>
        </Link>
      </div>
    </div>
  );
}
