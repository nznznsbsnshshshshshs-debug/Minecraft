import { motion } from "framer-motion";

function ShimmerBar({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded ${className}`}
      style={{ background: "rgba(255,255,255,0.05)" }}>
      <motion.div
        className="absolute inset-0"
        style={{ background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.08), transparent)" }}
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 1.4, ease: "linear" as const }}
      />
    </div>
  );
}

export function ModSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <ShimmerBar className="w-full h-36 rounded-none" />
      <div className="p-4 space-y-3">
        <ShimmerBar className="h-4 w-2/3" />
        <ShimmerBar className="h-3 w-full" />
        <ShimmerBar className="h-3 w-4/5" />
        <ShimmerBar className="h-9 w-full mt-4" />
      </div>
    </div>
  );
}

export function VideoSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <ShimmerBar className="w-full aspect-video rounded-none" />
      <div className="p-4 space-y-2">
        <ShimmerBar className="h-3 w-1/3" />
        <ShimmerBar className="h-4 w-full" />
        <ShimmerBar className="h-4 w-3/4" />
        <ShimmerBar className="h-3 w-1/4 mt-1" />
      </div>
    </div>
  );
}
