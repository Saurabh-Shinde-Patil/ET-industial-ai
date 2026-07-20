import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Document title is required'],
      trim: true,
    },
    documentType: {
      type: String,
      required: [true, 'Document type is required'],
      enum: [
        'SOP',
        'Maintenance Log',
        'Root Cause Analysis',
        'Preventive Maintenance',
        'Engineering Manual',
        'General',
      ],
      index: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      enum: ['PDF', 'DOCX', 'TXT', 'PNG', 'JPG'],
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    linkedAssetIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset',
        index: true,
      },
    ],
    version: {
      type: String,
      default: 'v1.0',
    },
    extractionStatus: {
      type: String,
      enum: ['Pending', 'Extracted', 'Failed'],
      default: 'Pending',
      index: true,
    },
    chunkCount: {
      type: Number,
      default: 0,
    },
    isOCR: {
      type: Boolean,
      default: false,
    },
    rawContent: {
      type: String,
      default: '',
    },
    metadata: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model('Document', documentSchema);

export default Document;
