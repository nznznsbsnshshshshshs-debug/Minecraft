import mongoose from 'mongoose';

const UploadSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  fileType: { type: String, required: true },
  fileSize: { type: Number, required: true },
  uploadDate: { type: Date, default: Date.now },
});

export default mongoose.models.Upload || mongoose.model('Upload', UploadSchema);
