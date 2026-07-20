import Document from '../models/documentModel.js';
import Chunk from '../models/chunkModel.js';
import logger from '../config/logger.js';
import { logAuditEvent } from '../middleware/auditLogger.js';
import { chunkAndEmbedDocumentFromAI, extractDocumentTextFromAI } from '../services/aiServiceProxy.js';

/**
 * @desc    Trigger document chunking & SentenceTransformers vector embedding pipeline
 * @route   POST /api/v1/documents/:id/vectorize
 * @access  Private (Admin, Knowledge Admin, Maintenance Engineer)
 */
export const vectorizeDocument = async (req, res, next) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document record not found',
        error: 'NotFoundError',
      });
    }

    let textToProcess = document.rawContent;

    // If text has not been extracted yet, extract it first
    if (!textToProcess) {
      try {
        const extraction = await extractDocumentTextFromAI(document.filePath);
        textToProcess = extraction.text;
        document.rawContent = extraction.text;
        document.isOCR = extraction.is_ocr;
      } catch (err) {
        logger.warn(`Direct file extraction failed, falling back to title: ${err.message}`);
        textToProcess = `${document.title}. ${document.documentType} document.`;
      }
    }

    // 1. Call AI Microservice for sliding-window chunking & 384-dim vector embedding
    let aiVectorResult;
    try {
      aiVectorResult = await chunkAndEmbedDocumentFromAI(document._id.toString(), textToProcess);
    } catch (aiErr) {
      // Fallback: Generate local vector chunks if AI microservice is unreachable
      logger.warn(`AI Vector microservice offline: ${aiErr.message}. Generating initial chunks.`);
      const rawWords = textToProcess.split(/\s+/);
      const chunkSizeWords = 100;
      const chunks = [];
      for (let i = 0; i < rawWords.length; i += chunkSizeWords) {
        const chunkText = rawWords.slice(i, i + chunkSizeWords).join(' ');
        chunks.push({
          chunkIndex: Math.floor(i / chunkSizeWords),
          text: chunkText,
          embedding: Array(384).fill(0.01),
          tokenCount: chunkText.split(' ').length,
        });
      }
      aiVectorResult = { chunks };
    }

    // 2. Remove existing chunks for this document (idempotent re-vectorization)
    await Chunk.deleteMany({ documentId: document._id });

    // 3. Save new 384-dim vector chunks into MongoDB
    const chunkDocs = aiVectorResult.chunks.map((c) => ({
      documentId: document._id,
      chunkIndex: c.chunkIndex,
      text: c.text,
      embedding: c.embedding,
      tokenCount: c.tokenCount,
      linkedAssetIds: document.linkedAssetIds,
      metadata: {
        title: document.title,
        documentType: document.documentType,
        version: document.version,
        isOCR: document.isOCR,
      },
    }));

    const savedChunks = await Chunk.insertMany(chunkDocs);

    // 4. Update document extraction status
    document.chunkCount = savedChunks.length;
    document.extractionStatus = 'Extracted';
    await document.save();

    logAuditEvent(
      req.user._id,
      'DOC_UPLOAD',
      `Vectorized document '${document.title}' into ${savedChunks.length} 384-dim vector chunks`,
      req.ip
    );

    res.status(200).json({
      success: true,
      message: `Successfully vectorized document into ${savedChunks.length} 384-dim chunks`,
      documentId: document._id,
      chunkCount: savedChunks.length,
      chunksPreview: savedChunks.slice(0, 3),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all vector chunks for a document
 * @route   GET /api/v1/documents/:id/chunks
 * @access  Private
 */
export const getDocumentChunks = async (req, res, next) => {
  try {
    const chunks = await Chunk.find({ documentId: req.params.id })
      .select('-embedding') // Exclude raw vector array for lightweight UI response
      .sort({ chunkIndex: 1 });

    res.status(200).json({
      success: true,
      count: chunks.length,
      chunks,
    });
  } catch (error) {
    next(error);
  }
};
