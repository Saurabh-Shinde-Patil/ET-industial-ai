import express from 'express';
import {
  uploadDocument,
  getDocuments,
  getDocumentById,
  extractDocumentText,
  linkAssetsToDocument,
  deleteDocument,
  seedDocuments,
} from '../controllers/documentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/rbacMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.use(protect);

/**
 * @openapi
 * /api/v1/documents/seed:
 *   post:
 *     summary: Seed initial ground-truth industrial demo documents
 *     tags: [Documents]
 */
router.post('/seed', authorize('Admin'), seedDocuments);

/**
 * @openapi
 * /api/v1/documents/upload:
 *   post:
 *     summary: Upload multi-format industrial document
 *     tags: [Documents]
 */
router.post('/upload', upload.single('file'), uploadDocument);

/**
 * @openapi
 * /api/v1/documents:
 *   get:
 *     summary: Search & query document catalog
 *     tags: [Documents]
 */
router.get('/', getDocuments);

/**
 * @openapi
 * /api/v1/documents/{id}/extract:
 *   post:
 *     summary: Trigger PyTesseract OCR & Text extraction
 *     tags: [Documents]
 */
router.post('/:id/extract', extractDocumentText);

/**
 * @openapi
 * /api/v1/documents/{id}:
 *   get:
 *     summary: Fetch single document details
 *     tags: [Documents]
 *   delete:
 *     summary: Delete document record and file
 *     tags: [Documents]
 */
router.route('/:id')
  .get(getDocumentById)
  .delete(authorize('Admin', 'Knowledge Admin'), deleteDocument);

/**
 * @openapi
 * /api/v1/documents/{id}/link-assets:
 *   put:
 *     summary: Link document to plant assets
 *     tags: [Documents]
 */
router.put('/:id/link-assets', authorize('Admin', 'Knowledge Admin'), linkAssetsToDocument);

export default router;
