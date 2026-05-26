import mongoose from 'mongoose';

const ModSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  minecraftVersion: { type: String, required: true },
  category: { type: String, required: true },
  downloadLink: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  featured: { type: Boolean, default: false },
  tags: [{ type: String }],
  fileSize: { type: Number, required: true },
});

export default mongoose.models.Mod || mongoose.model('Mod', ModSchema);
