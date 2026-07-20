import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema(
  {
    assetCode: {
      type: String,
      required: [true, 'Asset code is required'],
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Asset name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Asset category is required'],
      enum: [
        'Pumps',
        'Boilers',
        'Compressors',
        'Turbines',
        'Heat Exchangers',
        'Valves',
        'Conveyors',
        'Transformers',
        'Reactors',
        'Chillers',
        'General Machinery',
      ],
      index: true,
    },
    parentAssetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asset',
      default: null,
      index: true,
    },
    location: {
      type: String,
      required: [true, 'Plant location is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Operational', 'Under Maintenance', 'Failed', 'Decommissioned'],
      default: 'Operational',
      index: true,
    },
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    installedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for fetching sub-assets (children)
assetSchema.virtual('children', {
  ref: 'Asset',
  localField: '_id',
  foreignField: 'parentAssetId',
});

const Asset = mongoose.model('Asset', assetSchema);

export default Asset;
