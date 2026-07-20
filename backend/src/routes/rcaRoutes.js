import express from 'express';
import {
  getIncidents,
  createIncident,
  generateAI5Whys,
  updateIncidentStatus,
  seedIncidents,
} from '../controllers/rcaController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

/**
 * @openapi
 * /api/v1/incidents:
 *   get:
 *     summary: Retrieve All Incident RCA Reports
 *     tags: [Root Cause Analysis]
 *   post:
 *     summary: Create New Plant Incident Log
 *     tags: [Root Cause Analysis]
 */
router.route('/')
  .get(getIncidents)
  .post(createIncident);

/**
 * @openapi
 * /api/v1/incidents/{id}/generate-rca:
 *   post:
 *     summary: Trigger AI 5-Whys Root Cause Analysis Generation
 *     tags: [Root Cause Analysis]
 */
router.post('/:id/generate-rca', generateAI5Whys);

/**
 * @openapi
 * /api/v1/incidents/{id}/status:
 *   put:
 *     summary: Update Incident Lifecycle Status
 *     tags: [Root Cause Analysis]
 */
router.put('/:id/status', updateIncidentStatus);

/**
 * @openapi
 * /api/v1/incidents/seed:
 *   post:
 *     summary: Seed Ground-Truth Incident RCA Reports
 *     tags: [Root Cause Analysis]
 */
router.post('/seed', seedIncidents);

export default router;
