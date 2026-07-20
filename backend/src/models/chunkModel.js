import mongoose from 'mongoose';

const chunkSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
      required: true,
      index: true,
    },
    chunkIndex: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    embedding: {
      type: [Number], // 384-dimensional SentenceTransformer vector
      default: [],
    },
    tokenCount: {
      type: Number,
      default: 0,
    },
    linkedAssetIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset',
        index: true,
      },
    ],
    metadata: {
      title: String,
      documentType: String,
      version: String,
      isOCR: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for document and chunk order
chunkSchema.index({ documentId: 1, chunkIndex: 1 }, { unique: true });

const Chunk = mongoose.model('Chunk', chunkSchema);

export default Chunk;
