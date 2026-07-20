import express from 'express';
import { getAuditLogs } from '../controllers/auditController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/rbacMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(authorize('Admin', 'Knowledge Admin'));

/**
 * @openapi
 * /api/v1/audit-logs:
 *   get:
 *     summary: Fetch security audit log trail (Admin)
 *     tags: [Audit Logs]
 */
router.get('/', getAuditLogs);

export default router;
