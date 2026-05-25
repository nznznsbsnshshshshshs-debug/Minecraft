import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ShieldCheck, Plus, Trash2, Upload, Check, AlertCircle } from "lucide-react";
import { useListMods, useCreateMod, useDeleteMod, getListModsQueryKey } from "@workspace/api-client-react";
import { ModSkeleton } from "@/components/skeleton-card";

const EMPTY_FORM = {
  name: "", description: "", category: "java" as "java" | "bedrock",
  version: "", downloadUrl: "", imageUrl: "", author: "", tags: "", featured: false,
};

export default function Admin() {
  const qc = useQueryClient();
  const { data: mods, isLoading } = useListMods();
  const createMod = useCreateMod();
  const deleteMod = useDeleteMod();

  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const showToast = (type: "ok" | "err", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMod.mutateAsync({
        data: {
          name: form.name,
          description: form.description,
          category: form.category,
          version: form.version,
          downloadUrl: form.downloadUrl,
          imageUrl: form.imageUrl || undefined,
          featured: form.featured,
          author: form.author,
          tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        },
      });
      qc.invalidateQueries({ queryKey: getListModsQueryKey() });
      setForm(EMPTY_FORM);
      setShowForm(false);
      showToast("ok", "Mod uploaded successfully!");
    } catch {
      showToast("err", "Failed to upload mod. Check the fields.");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    setDeleting(id);
    try {
      await deleteMod.mutateAsync({ id });
      qc.invalidateQueries({ queryKey: getListModsQueryKey() });
      showToast("ok", `"${name}" deleted.`);
    } catch {
      showToast("err", "Failed to delete mod.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium shadow-lg transition-all ${
          toast.type === "ok"
            ? "bg-green-500/10 border-green-400/40 text-green-300"
            : "bg-red-500/10 border-red-400/40 text-red-300"
        }`}>
          {toast.type === "ok" ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="relative overflow-hidden px-5 pt-12 pb-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.10),transparent_60%)]" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-green-400" />
              <h1 className="text-2xl font-black">Admin Panel</h1>
            </div>
            <button
              onClick={() => setShowForm((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-400/30 text-green-300 text-sm font-semibold hover:bg-green-500/20 transition-all"
            >
              {showForm ? "Cancel" : <><Plus className="w-4 h-4" /> Upload Mod</>}
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 max-w-2xl mx-auto space-y-6">
        {/* Upload form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="glass-card rounded-2xl border border-green-500/20 p-5 space-y-4">
            <h2 className="font-bold text-base flex items-center gap-2 text-green-300">
              <Upload className="w-4 h-4" /> Upload New Mod
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: "name", label: "Mod Name", placeholder: "e.g. Futuristic Shaders" },
                { key: "author", label: "Author", placeholder: "e.g. YGP Team" },
                { key: "version", label: "Version", placeholder: "e.g. 1.0.0" },
                { key: "downloadUrl", label: "Download URL", placeholder: "https://..." },
                { key: "imageUrl", label: "Image URL (optional)", placeholder: "https://..." },
                { key: "tags", label: "Tags (comma-separated)", placeholder: "shaders, pvp, survival" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs text-zinc-400 mb-1">{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={(form as any)[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full bg-zinc-900/80 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-green-400/60 transition-colors"
                    required={key !== "imageUrl" && key !== "tags"}
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">Description</label>
              <textarea
                placeholder="Describe the mod..."
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                className="w-full bg-zinc-900/80 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-green-400/60 transition-colors resize-none"
                required
              />
            </div>

            <div className="flex items-center gap-6">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as "java" | "bedrock" }))}
                  className="bg-zinc-900/80 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-green-400/60 transition-colors"
                >
                  <option value="java">Java</option>
                  <option value="bedrock">Bedrock</option>
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer mt-4">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                  className="w-4 h-4 rounded accent-green-400"
                />
                Featured mod
              </label>
            </div>

            <button
              type="submit"
              disabled={createMod.isPending}
              className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-400 disabled:opacity-60 font-bold text-black transition-all duration-200 shadow-[0_0_16px_rgba(74,222,128,0.3)]"
            >
              {createMod.isPending ? "Uploading..." : "Upload Mod"}
            </button>
          </form>
        )}

        {/* Mod list */}
        <div>
          <h2 className="font-bold text-base mb-4 text-zinc-300">
            All Mods {mods && <span className="text-zinc-500 font-normal text-sm">({mods.length})</span>}
          </h2>

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => <ModSkeleton key={i} />)}
            </div>
          ) : !mods || mods.length === 0 ? (
            <div className="text-center py-12 glass-card rounded-2xl border border-zinc-800">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-zinc-400">No mods uploaded yet.</p>
              <button onClick={() => setShowForm(true)} className="mt-3 text-green-400 text-sm hover:text-green-300">
                Upload the first one →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {mods.map((mod) => (
                <div key={mod.id} className="glass-card rounded-2xl border border-zinc-800 p-4 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-white">{mod.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                        mod.category === "java" ? "border-blue-400/30 text-blue-300" : "border-purple-400/30 text-purple-300"
                      }`}>{mod.category}</span>
                      {mod.featured && <span className="text-[10px] px-1.5 py-0.5 rounded border border-yellow-400/30 text-yellow-300">featured</span>}
                    </div>
                    <p className="text-zinc-500 text-xs mt-1 line-clamp-1">{mod.description}</p>
                    <p className="text-zinc-600 text-xs mt-0.5">v{mod.version} · by {mod.author} · {mod.downloads} downloads</p>
                  </div>
                  <button
                    onClick={() => handleDelete(mod.id, mod.name)}
                    disabled={deleting === mod.id}
                    className="shrink-0 p-2 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-400/40 transition-all disabled:opacity-50"
                    title="Delete mod"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
