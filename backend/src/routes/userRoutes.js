import express from 'express';
import { updatePreferences } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @openapi
 * /api/v1/users/preferences:
 *   put:
 *     summary: Update authenticated user preferences (Theme dark/light)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.put('/preferences', protect, updatePreferences);

export default router;
