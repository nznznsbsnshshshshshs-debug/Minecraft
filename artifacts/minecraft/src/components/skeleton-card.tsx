export function ModSkeleton() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-zinc-800 animate-pulse">
      <div className="w-full h-36 bg-zinc-800/60" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-zinc-800/80 rounded w-2/3" />
        <div className="h-3 bg-zinc-800/60 rounded w-full" />
        <div className="h-3 bg-zinc-800/60 rounded w-4/5" />
        <div className="h-9 bg-zinc-800/40 rounded-xl mt-4" />
      </div>
    </div>
  );
}

export function VideoSkeleton() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-zinc-800 animate-pulse">
      <div className="w-full aspect-video bg-zinc-800/60" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-zinc-800/80 rounded w-1/3" />
        <div className="h-4 bg-zinc-800/60 rounded w-full" />
        <div className="h-4 bg-zinc-800/60 rounded w-3/4" />
        <div className="h-3 bg-zinc-800/40 rounded w-1/4 mt-1" />
      </div>
    </div>
  );
}
