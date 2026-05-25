import mongoose from "mongoose";
import { logger } from "./logger";

let isConnected = false;

export async function connectMongo() {
  if (isConnected) return;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  await mongoose.connect(uri);
  isConnected = true;
  logger.info("MongoDB connected");
}

const ModSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["java", "bedrock"], required: true },
    version: { type: String, required: true },
    downloadUrl: { type: String, required: true },
    imageUrl: { type: String, default: null },
    downloads: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    author: { type: String, required: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: { createdAt: "uploadedAt", updatedAt: "updatedAt" } }
);

export const ModModel =
  mongoose.models.Mod || mongoose.model("Mod", ModSchema);
