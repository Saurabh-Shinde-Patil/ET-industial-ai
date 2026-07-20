import express from 'express';
import { vectorizeDocument, getDocumentChunks, searchVectorIndex } from '../controllers/vectorController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

/**
 * @openapi
 * /api/v1/search/vector:
 *   post:
 *     summary: FAISS Cosine Vector Similarity Search Engine
 *     tags: [Vector Search]
 */
router.post('/search/vector', searchVectorIndex);

/**
 * @openapi
 * /api/v1/documents/{id}/vectorize:
 *   post:
 *     summary: Trigger sliding window chunking & 384-dim SentenceTransformers vectorization
 *     tags: [Vector Pipeline]
 */
router.post('/documents/:id/vectorize', vectorizeDocument);

/**
 * @openapi
 * /api/v1/documents/{id}/chunks:
 *   get:
 *     summary: Retrieve stored text chunks for document
 *     tags: [Vector Pipeline]
 */
router.get('/documents/:id/chunks', getDocumentChunks);

export default router;
