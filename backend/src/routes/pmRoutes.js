import express from 'express';
import {
  getPMRecommendations,
  analyzeAssetPM,
  updatePMStatus,
  seedPMRecommendations,
} from '../controllers/pmController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

/**
 * @openapi
 * /api/v1/pm-recommendations:
 *   get:
 *     summary: Retrieve AI Preventive Maintenance Schedules & Risk Scores
 *     tags: [Preventive Maintenance]
 */
router.get('/', getPMRecommendations);

/**
 * @openapi
 * /api/v1/pm-recommendations/analyze/{assetId}:
 *   post:
 *     summary: Trigger AI PM Predictive Failure Risk Analysis for Asset Node
 *     tags: [Preventive Maintenance]
 */
router.post('/analyze/:assetId', analyzeAssetPM);

/**
 * @openapi
 * /api/v1/pm-recommendations/{id}/status:
 *   put:
 *     summary: Update PM Schedule Status (Active, Scheduled, Completed, Dismissed)
 *     tags: [Preventive Maintenance]
 */
router.put('/:id/status', updatePMStatus);

/**
 * @openapi
 * /api/v1/pm-recommendations/seed:
 *   post:
 *     summary: Seed Ground-Truth AI PM Schedules
 *     tags: [Preventive Maintenance]
 */
router.post('/seed', seedPMRecommendations);

export default router;
