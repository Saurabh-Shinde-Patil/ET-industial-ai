import Document from '../models/documentModel.js';
import fs from 'fs';
import path from 'path';
import logger from '../config/logger.js';
import { seedInitialDocuments } from '../utils/seedDocuments.js';
import { logAuditEvent } from '../middleware/auditLogger.js';
import { extractDocumentTextFromAI } from '../services/aiServiceProxy.js';

/**
 * @desc    Upload new industrial document & link to plant assets
 * @route   POST /api/v1/documents/upload
 * @access  Private (Admin, Knowledge Admin, Maintenance Engineer)
 */
export const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No document file uploaded',
        error: 'ValidationError',
      });
    }

    const { title, documentType, linkedAssetIds, version, isOCR } = req.body;

    if (!title || !documentType) {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: 'Title and documentType are required',
        error: 'ValidationError',
      });
    }

    const ext = path.extname(req.file.originalname).toLowerCase();
    let fileType = 'PDF';
    if (ext === '.docx') fileType = 'DOCX';
    else if (ext === '.txt') fileType = 'TXT';
    else if (ext === '.png') fileType = 'PNG';
    else if (ext === '.jpg' || ext === '.jpeg') fileType = 'JPG';

    let assets = [];
    if (linkedAssetIds) {
      assets = typeof linkedAssetIds === 'string' ? JSON.parse(linkedAssetIds) : linkedAssetIds;
    }

    const document = await Document.create({
      title,
      documentType,
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType,
      fileSize: req.file.size,
      uploadedBy: req.user._id,
      linkedAssetIds: assets,
      version: version || 'v1.0',
      extractionStatus: 'Pending',
      isOCR: isOCR === 'true' || isOCR === true,
    });

    logAuditEvent(
      req.user._id,
      'DOC_UPLOAD',
      `User '${req.user.username}' uploaded document '${document.title}' (${fileType}) linked to ${assets.length} assets`,
      req.ip
    );

    res.status(201).json({
      success: true,
      message: 'Document uploaded successfully',
      document,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get documents with type, asset, and title search filters
 * @route   GET /api/v1/documents
 * @access  Private
 */
export const getDocuments = async (req, res, next) => {
  try {
    const { documentType, assetId, search, page = 1, limit = 50 } = req.query;

    const query = {};

    if (documentType) {
      query.documentType = documentType;
    }

    if (assetId) {
      query.linkedAssetIds = assetId;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { fileName: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const documents = await Document.find(query)
      .populate('uploadedBy', 'username role')
      .populate('linkedAssetIds', 'assetCode name location')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Document.countDocuments(query);

    res.status(200).json({
      success: true,
      count: documents.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      documents,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single document profile details
 * @route   GET /api/v1/documents/:id
 * @access  Private
 */
export const getDocumentById = async (req, res, next) => {
  try {
    const document = await Document.findById(req.params.id)
      .populate('uploadedBy', 'username role email')
      .populate('linkedAssetIds', 'assetCode name location category status');

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document record not found',
        error: 'NotFoundError',
      });
    }

    res.status(200).json({
      success: true,
      document,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Trigger AI Microservice Text & OCR Extraction on document
 * @route   POST /api/v1/documents/:id/extract
 * @access  Private (Admin, Knowledge Admin, Maintenance Engineer)
 */
export const extractDocumentText = async (req, res, next) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document record not found',
        error: 'NotFoundError',
      });
    }

    // Call Python FastAPI AI Service /extract
    let extractionResult;
    try {
      extractionResult = await extractDocumentTextFromAI(document.filePath);
    } catch (aiErr) {
      // Fallback if AI microservice is not reachable: use rawContent or basic text fallback
      if (document.rawContent) {
        extractionResult = {
          text: document.rawContent,
          is_ocr: document.isOCR || false,
          word_count: document.rawContent.split(/\s+/).length,
        };
      } else {
        throw new Error(`AI Extraction service unavailable: ${aiErr.message}`);
      }
    }

    document.rawContent = extractionResult.text;
    document.isOCR = extractionResult.is_ocr;
    document.extractionStatus = 'Extracted';
    document.chunkCount = Math.ceil((extractionResult.word_count || 100) / 250); // ~250 words per chunk

    await document.save();

    logger.info(`Successfully extracted text for document '${document.title}' (${document.chunkCount} chunks)`);

    res.status(200).json({
      success: true,
      message: 'Text & OCR extraction completed successfully',
      document,
      extractedSnippet: extractionResult.text.substring(0, 500),
      wordCount: extractionResult.word_count,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update asset associations for document
 * @route   PUT /api/v1/documents/:id/link-assets
 * @access  Private (Admin, Knowledge Admin)
 */
export const linkAssetsToDocument = async (req, res, next) => {
  try {
    const { linkedAssetIds } = req.body;
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document record not found',
        error: 'NotFoundError',
      });
    }

    document.linkedAssetIds = linkedAssetIds || [];
    await document.save();

    res.status(200).json({
      success: true,
      message: 'Document asset links updated successfully',
      document,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete document record and file
 * @route   DELETE /api/v1/documents/:id
 * @access  Private (Admin, Knowledge Admin)
 */
export const deleteDocument = async (req, res, next) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document record not found',
        error: 'NotFoundError',
      });
    }

    if (document.filePath && fs.existsSync(document.filePath)) {
      try {
        fs.unlinkSync(document.filePath);
      } catch (err) {
        logger.warn(`Could not delete file from disk: ${err.message}`);
      }
    }

    await Document.findByIdAndDelete(req.params.id);

    logAuditEvent(
      req.user._id,
      'DOC_DELETE',
      `User '${req.user.username}' deleted document '${document.title}'`,
      req.ip
    );

    res.status(200).json({
      success: true,
      message: `Document '${document.title}' removed from repository`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Seed sample ground-truth industrial documents
 * @route   POST /api/v1/documents/seed
 * @access  Private (Admin)
 */
export const seedDocuments = async (req, res, next) => {
  try {
    const seeded = await seedInitialDocuments();
    res.status(200).json({
      success: true,
      message: `Seeded ${seeded.length} industrial documents into database`,
      documents: seeded,
    });
  } catch (error) {
    next(error);
  }
};
