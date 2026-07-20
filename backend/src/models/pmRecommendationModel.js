import mongoose from 'mongoose';

const pmRecommendationSchema = new mongoose.Schema(
  {
    assetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asset',
      required: true,
      index: true,
    },
    assetCode: {
      type: String,
      required: true,
      uppercase: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'Preventive Maintenance',
    },
    riskScore: {
      type: Number, // 0 to 100%
      required: true,
    },
    priority: {
      type: String,
      enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'],
      default: 'MEDIUM',
      index: true,
    },
    recommendedInterval: {
      type: String,
      default: 'Every 500 Operating Hours',
    },
    actionItems: [
      {
        type: String,
      },
    ],
    suggestedParts: [
      {
        type: String,
      },
    ],
    justification: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Scheduled', 'Completed', 'Dismissed'],
      default: 'Active',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const PMRecommendation = mongoose.model('PMRecommendation', pmRecommendationSchema);

export default PMRecommendation;
