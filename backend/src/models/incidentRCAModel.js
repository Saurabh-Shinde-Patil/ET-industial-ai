import mongoose from 'mongoose';

const correctiveActionSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    default: 'Maintenance Engineer',
  },
  dueDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
});

const incidentRCASchema = new mongoose.Schema(
  {
    incidentNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true,
    },
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
    incidentDate: {
      type: Date,
      default: Date.now,
    },
    severity: {
      type: String,
      enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'],
      default: 'HIGH',
      index: true,
    },
    rootCauseCategory: {
      type: String,
      default: 'Lubrication Failure',
    },
    summary: {
      type: String,
      required: true,
    },
    fiveWhys: [
      {
        whyNumber: { type: Number, required: true },
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    correctiveActions: [correctiveActionSchema],
    status: {
      type: String,
      enum: ['Under Investigation', 'RCA Completed', 'Actions Implemented', 'Closed'],
      default: 'Under Investigation',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const IncidentRCA = mongoose.model('IncidentRCA', incidentRCASchema);

export default IncidentRCA;
