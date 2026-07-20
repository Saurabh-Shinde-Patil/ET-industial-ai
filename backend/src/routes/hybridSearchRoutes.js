import express from 'express';
import { searchHybridIndex } from '../controllers/hybridSearchController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

/**
 * @openapi
 * /api/v1/search/hybrid:
 *   post:
 *     summary: Reciprocal Rank Fusion (RRF) Hybrid Search Engine
 *     tags: [Hybrid Search]
 */
router.post('/search/hybrid', searchHybridIndex);

export default router;
