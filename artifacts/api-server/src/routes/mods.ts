import { Router, type IRouter } from "express";
import { connectMongo, ModModel } from "../lib/mongodb";

const router: IRouter = Router();

router.get("/mods", async (req, res) => {
  try {
    await connectMongo();
    const { category, featured } = req.query as Record<string, string>;
    const filter: Record<string, unknown> = {};
    if (category === "java" || category === "bedrock") filter.category = category;
    if (featured === "true") filter.featured = true;
    const mods = await ModModel.find(filter).sort({ uploadedAt: -1 }).lean();
    const mapped = mods.map((m: any) => ({
      id: String(m._id),
      name: m.name,
      description: m.description,
      category: m.category,
      version: m.version,
      downloadUrl: m.downloadUrl,
      imageUrl: m.imageUrl ?? null,
      downloads: m.downloads ?? 0,
      uploadedAt: m.uploadedAt?.toISOString() ?? new Date().toISOString(),
      featured: m.featured ?? false,
      author: m.author,
      tags: m.tags ?? [],
    }));
    res.json(mapped);
  } catch (err) {
    req.log.error({ err }, "Failed to list mods");
    res.status(500).json({ success: false, message: "Failed to fetch mods" });
  }
});

router.post("/mods", async (req, res) => {
  try {
    await connectMongo();
    const { name, description, category, version, downloadUrl, imageUrl, featured, author, tags } = req.body;
    if (!name || !description || !category || !version || !downloadUrl || !author) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const mod = await ModModel.create({ name, description, category, version, downloadUrl, imageUrl, featured: featured ?? false, author, tags: tags ?? [] });
    return res.status(201).json({
      id: String(mod._id),
      name: mod.name,
      description: mod.description,
      category: mod.category,
      version: mod.version,
      downloadUrl: mod.downloadUrl,
      imageUrl: mod.imageUrl ?? null,
      downloads: 0,
      uploadedAt: (mod as any).uploadedAt?.toISOString() ?? new Date().toISOString(),
      featured: mod.featured,
      author: mod.author,
      tags: mod.tags,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create mod");
    return res.status(500).json({ success: false, message: "Failed to create mod" });
  }
});

router.get("/mods/:id", async (req, res) => {
  try {
    await connectMongo();
    const mod = await ModModel.findById(req.params.id).lean() as any;
    if (!mod) return res.status(404).json({ success: false, message: "Mod not found" });
    return res.json({
      id: String(mod._id),
      name: mod.name,
      description: mod.description,
      category: mod.category,
      version: mod.version,
      downloadUrl: mod.downloadUrl,
      imageUrl: mod.imageUrl ?? null,
      downloads: mod.downloads ?? 0,
      uploadedAt: mod.uploadedAt?.toISOString() ?? new Date().toISOString(),
      featured: mod.featured ?? false,
      author: mod.author,
      tags: mod.tags ?? [],
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get mod");
    return res.status(500).json({ success: false, message: "Failed to fetch mod" });
  }
});

router.delete("/mods/:id", async (req, res) => {
  try {
    await connectMongo();
    const mod = await ModModel.findByIdAndDelete(req.params.id).lean() as any;
    if (!mod) return res.status(404).json({ success: false, message: "Mod not found" });
    return res.json({
      id: String(mod._id),
      name: mod.name,
      description: mod.description,
      category: mod.category,
      version: mod.version,
      downloadUrl: mod.downloadUrl,
      imageUrl: mod.imageUrl ?? null,
      downloads: mod.downloads ?? 0,
      uploadedAt: mod.uploadedAt?.toISOString() ?? new Date().toISOString(),
      featured: mod.featured ?? false,
      author: mod.author,
      tags: mod.tags ?? [],
    });
  } catch (err) {
    req.log.error({ err }, "Failed to delete mod");
    return res.status(500).json({ success: false, message: "Failed to delete mod" });
  }
});

export default router;
