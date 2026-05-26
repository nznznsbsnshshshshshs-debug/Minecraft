import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
  page: { type: String, required: true },
  visits: { type: Number, default: 0 },
  lastVisited: { type: Date, default: Date.now },
});

export default mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema);
