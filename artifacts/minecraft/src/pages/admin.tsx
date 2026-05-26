import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ShieldCheck, Plus, Trash2, Upload, Check, AlertCircle, Terminal, Lock, Eye, EyeOff, Pencil, X } from "lucide-react";
import { useListMods, useCreateMod, useDeleteMod, useUpdateMod, getListModsQueryKey } from "@workspace/api-client-react";
import type { Mod } from "@workspace/api-client-react";
import { ModSkeleton } from "@/components/skeleton-card";
import PageTransition from "@/components/page-transition";
import { motion, AnimatePresence } from "framer-motion";

const BASE_URL = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";

const EMPTY_FORM = {
  name: "", description: "", category: "java" as "java" | "bedrock",
  version: "", downloadUrl: "", imageUrl: "", author: "", tags: "", featured: false,
};

const inputCls =
  "w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none bg-zinc-900/80 border border-zinc-800 focus:border-green-400/50";

async function verifyPassword(password: string): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await verifyPassword(pw);
    setLoading(false);
    if (ok) {
      onUnlock();
    } else {
      setError("Incorrect password.");
      setShake(true);
      setPw("");
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-5 pb-20">
        <motion.div
          animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-sm"
        >
          <div className="rounded-2xl p-8"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(74,222,128,0.2)", backdropFilter: "blur(20px)" }}>
            <div className="flex flex-col items-center mb-8">
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)" }}
                animate={{ boxShadow: ["0 0 0px rgba(74,222,128,0.2)", "0 0 20px rgba(74,222,128,0.4)", "0 0 0px rgba(74,222,128,0.2)"] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Lock className="w-7 h-7" style={{ color: "#4ade80" }} />
              </motion.div>
              <h1 className="text-xl font-black text-white">Restricted Access</h1>
              <p className="text-zinc-500 text-sm mt-1 text-center">Enter the admin password to continue.</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                  className={inputCls + " pr-10"}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-400 text-xs flex items-center gap-1.5"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={loading || !pw}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl font-black text-black transition-all disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #4ade80, #22c55e)", boxShadow: "0 0 20px rgba(74,222,128,0.3)" }}
              >
                {loading ? "Verifying..." : "Unlock"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}

function modToForm(mod: Mod) {
  return {
    name: mod.name,
    description: mod.description,
    category: mod.category as "java" | "bedrock",
    version: mod.version,
    downloadUrl: mod.downloadUrl,
    imageUrl: mod.imageUrl ?? "",
    author: mod.author,
    tags: mod.tags?.join(", ") ?? "",
    featured: mod.featured,
  };
}

function EditModal({
  mod,
  onClose,
  onSave,
  saving,
}: {
  mod: Mod;
  onClose: () => void;
  onSave: (data: ReturnType<typeof modToForm>) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(() => modToForm(mod));

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      />
      <motion.div
        className="relative w-full max-w-lg rounded-2xl p-6 z-10"
        style={{ background: "#0a0a0a", border: "1px solid rgba(74,222,128,0.25)", boxShadow: "0 0 60px rgba(74,222,128,0.08)" }}
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-black text-base flex items-center gap-2" style={{ color: "#4ade80" }}>
            <Pencil className="w-4 h-4" /> Edit Mod
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); onSave(form); }}
          className="space-y-4 max-h-[70vh] overflow-y-auto pr-1"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: "name",        label: "Mod Name",              placeholder: "e.g. Futuristic Shaders", req: true },
              { key: "author",      label: "Author",                placeholder: "e.g. YGP Team",           req: true },
              { key: "version",     label: "Version",               placeholder: "e.g. 1.0.0",              req: true },
              { key: "downloadUrl", label: "Download URL",          placeholder: "https://...",              req: true },
              { key: "imageUrl",    label: "Image URL (optional)",  placeholder: "https://...",              req: false },
              { key: "tags",        label: "Tags (comma-separated)",placeholder: "shaders, pvp",             req: false },
            ].map(({ key, label, placeholder, req }) => (
              <div key={key}>
                <label className="block text-xs text-zinc-500 mb-1.5">{label}</label>
                <input
                  type="text"
                  placeholder={placeholder}
                  value={(form as any)[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className={inputCls}
                  required={req}
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Description</label>
            <textarea
              placeholder="Describe the mod..."
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              className={inputCls}
              required
            />
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as "java" | "bedrock" }))}
                className="rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none bg-zinc-900/80 border border-zinc-800 focus:border-green-400/50 transition-colors"
              >
                <option value="java">☕ Java</option>
                <option value="bedrock">📱 Bedrock</option>
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer mt-5">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                className="w-4 h-4 rounded accent-green-400"
              />
              ⭐ Featured mod
            </label>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#71717a" }}
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              disabled={saving}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 rounded-xl font-black text-black transition-all disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #4ade80, #22c55e)", boxShadow: "0 0 20px rgba(74,222,128,0.3)" }}
            >
              {saving ? "Saving..." : "💾 Save Changes"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function Admin() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("ygp_admin_auth") === "1");
  const qc = useQueryClient();
  const { data: mods, isLoading } = useListMods();
  const createMod = useCreateMod();
  const deleteMod = useDeleteMod();
  const updateMod = useUpdateMod();

  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editingMod, setEditingMod] = useState<Mod | null>(null);

  const handleUnlock = () => {
    sessionStorage.setItem("ygp_admin_auth", "1");
    setUnlocked(true);
  };

  if (!unlocked) return <PasswordGate onUnlock={handleUnlock} />;

  const showToast = (type: "ok" | "err", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMod.mutateAsync({
        data: {
          name: form.name, description: form.description, category: form.category,
          version: form.version, downloadUrl: form.downloadUrl,
          imageUrl: form.imageUrl || undefined, featured: form.featured, author: form.author,
          tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        },
      });
      qc.invalidateQueries({ queryKey: getListModsQueryKey() });
      setForm(EMPTY_FORM); setShowForm(false);
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
    } finally { setDeleting(null); }
  };

  const handleEdit = async (formData: ReturnType<typeof modToForm>) => {
    if (!editingMod) return;
    try {
      await updateMod.mutateAsync({
        id: editingMod.id,
        data: {
          name: formData.name,
          description: formData.description,
          category: formData.category,
          version: formData.version,
          downloadUrl: formData.downloadUrl,
          imageUrl: formData.imageUrl || undefined,
          featured: formData.featured,
          author: formData.author,
          tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        },
      });
      qc.invalidateQueries({ queryKey: getListModsQueryKey() });
      setEditingMod(null);
      showToast("ok", `"${formData.name}" updated.`);
    } catch {
      showToast("err", "Failed to update mod.");
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white pb-24">
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium shadow-xl"
              style={{
                background: toast.type === "ok" ? "rgba(74,222,128,0.1)" : "rgba(239,68,68,0.1)",
                border: `1px solid ${toast.type === "ok" ? "rgba(74,222,128,0.4)" : "rgba(239,68,68,0.4)"}`,
                color: toast.type === "ok" ? "#4ade80" : "#f87171",
                backdropFilter: "blur(16px)",
              }}
            >
              {toast.type === "ok" ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {toast.msg}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {editingMod && (
            <EditModal
              mod={editingMod}
              onClose={() => setEditingMod(null)}
              onSave={handleEdit}
              saving={updateMod.isPending}
            />
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="relative overflow-hidden px-5 pt-14 pb-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.10),transparent_60%)]" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl" style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}>
                  <ShieldCheck className="w-5 h-5" style={{ color: "#4ade80" }} />
                </div>
                <h1 className="text-2xl font-black">Admin Panel</h1>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => { sessionStorage.removeItem("ygp_admin_auth"); setUnlocked(false); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                  style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}
                >
                  Lock
                </motion.button>
                <motion.button
                  onClick={() => setShowForm((v) => !v)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: showForm ? "rgba(239,68,68,0.1)" : "rgba(74,222,128,0.1)",
                    border: `1px solid ${showForm ? "rgba(239,68,68,0.3)" : "rgba(74,222,128,0.3)"}`,
                    color: showForm ? "#f87171" : "#4ade80",
                  }}
                >
                  {showForm ? "✕ Cancel" : <><Plus className="w-4 h-4" /> Upload Mod</>}
                </motion.button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mt-4 text-[10px] font-mono"
              style={{ color: "rgba(74,222,128,0.4)" }}>
              <Terminal className="w-3 h-3" />
              <span>ADMIN_OS v2.0</span>
              <span>·</span>
              <span>{mods?.length ?? 0} MODS INDEXED</span>
              <span>·</span>
              <motion.span style={{ color: "#4ade80" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                ● LIVE
              </motion.span>
            </motion.div>
          </div>
        </div>

        <div className="px-5 max-w-2xl mx-auto space-y-6">
          <AnimatePresence>
            {showForm && (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: -16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="rounded-2xl p-5 space-y-4"
                style={{ background: "rgba(74,222,128,0.03)", border: "1px solid rgba(74,222,128,0.2)", backdropFilter: "blur(16px)" }}
              >
                <h2 className="font-bold text-base flex items-center gap-2" style={{ color: "#4ade80" }}>
                  <Upload className="w-4 h-4" /> Upload New Mod
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: "name", label: "Mod Name", placeholder: "e.g. Futuristic Shaders", req: true },
                    { key: "author", label: "Author", placeholder: "e.g. YGP Team", req: true },
                    { key: "version", label: "Version", placeholder: "e.g. 1.0.0", req: true },
                    { key: "downloadUrl", label: "Download URL", placeholder: "https://...", req: true },
                    { key: "imageUrl", label: "Image URL (optional)", placeholder: "https://...", req: false },
                    { key: "tags", label: "Tags (comma-separated)", placeholder: "shaders, pvp", req: false },
                  ].map(({ key, label, placeholder, req }) => (
                    <div key={key}>
                      <label className="block text-xs text-zinc-500 mb-1.5">{label}</label>
                      <input type="text" placeholder={placeholder} value={(form as any)[key]}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                        className={inputCls} required={req} />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs text-zinc-500 mb-1.5">Description</label>
                  <textarea placeholder="Describe the mod..." value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    rows={3} className={inputCls} required />
                </div>

                <div className="flex items-center gap-6 flex-wrap">
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5">Category</label>
                    <select value={form.category}
                      onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as "java" | "bedrock" }))}
                      className="rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none bg-zinc-900/80 border border-zinc-800 focus:border-green-400/50 transition-colors">
                      <option value="java">☕ Java</option>
                      <option value="bedrock">📱 Bedrock</option>
                    </select>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer mt-5">
                    <input type="checkbox" checked={form.featured}
                      onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                      className="w-4 h-4 rounded accent-green-400" />
                    ⭐ Featured mod
                  </label>
                </div>

                <motion.button type="submit" disabled={createMod.isPending}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl font-black text-black transition-all disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg, #4ade80, #22c55e)", boxShadow: "0 0 20px rgba(74,222,128,0.35)" }}>
                  {createMod.isPending ? "Uploading..." : "⚡ Upload Mod"}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Mod list */}
          <div>
            <h2 className="font-bold text-base mb-4 text-zinc-300">
              All Mods {mods && <span className="text-zinc-600 font-mono text-sm">({mods.length})</span>}
            </h2>
            {isLoading ? (
              <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <ModSkeleton key={i} />)}</div>
            ) : !mods || mods.length === 0 ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.08)" }}>
                <div className="text-4xl mb-3">📭</div>
                <p className="text-zinc-400 font-semibold">No mods uploaded yet.</p>
              </motion.div>
            ) : (
              <motion.div className="space-y-3" initial="hidden" animate="show"
                variants={{ show: { transition: { staggerChildren: 0.05 } } }}>
                {mods.map((mod) => (
                  <motion.div key={mod.id}
                    variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.3 } } }}
                    className="rounded-2xl p-4 flex items-start justify-between gap-3 group"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                    whileHover={{ borderColor: "rgba(74,222,128,0.2)" }}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-bold text-sm text-white">{mod.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                          mod.category === "java" ? "border-blue-400/30 text-blue-300" : "border-purple-400/30 text-purple-300"
                        }`}>{mod.category}</span>
                        {mod.featured && <span className="text-[10px] px-1.5 py-0.5 rounded border border-yellow-400/30 text-yellow-300">⭐ featured</span>}
                      </div>
                      <p className="text-zinc-500 text-xs line-clamp-1">{mod.description}</p>
                      <p className="text-zinc-700 text-xs mt-0.5 font-mono">v{mod.version} · {mod.author} · {mod.downloads} dl</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <motion.button
                        onClick={() => setEditingMod(mod)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-xl transition-all"
                        style={{ border: "1px solid rgba(74,222,128,0.2)", color: "#4ade80" }}
                        title="Edit mod"
                      >
                        <Pencil className="w-4 h-4" />
                      </motion.button>
                      <motion.button onClick={() => handleDelete(mod.id, mod.name)} disabled={deleting === mod.id}
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-xl transition-all disabled:opacity-50"
                        style={{ border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}
                        title="Delete mod"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
