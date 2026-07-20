import express from 'express';
import { getAnalyticsSummary } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

/**
 * @openapi
 * /api/v1/analytics/summary:
 *   get:
 *     summary: Aggregated System Analytics & RAG Metrics Summary
 *     tags: [Analytics & Metrics]
 */
router.get('/summary', getAnalyticsSummary);

export default router;
