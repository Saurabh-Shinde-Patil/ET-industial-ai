import express from 'express';
import {
  getUsers,
  createUser,
  updateUserRole,
  toggleUserStatus,
  updatePreferences,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/rbacMiddleware.js';

const router = express.Router();

// User Preferences (Authenticated users)
router.put('/preferences', protect, updatePreferences);

// Admin User Administration Endpoints
router.use(protect);
router.use(authorize('Admin', 'Knowledge Admin'));

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     summary: List all plant personnel users (Admin)
 *     tags: [Users]
 *   post:
 *     summary: Create new plant user account (Admin)
 *     tags: [Users]
 */
router.route('/')
  .get(getUsers)
  .post(authorize('Admin'), createUser);

/**
 * @openapi
 * /api/v1/users/{id}/role:
 *   put:
 *     summary: Update user role assignment (Admin)
 *     tags: [Users]
 */
router.put('/:id/role', authorize('Admin'), updateUserRole);

/**
 * @openapi
 * /api/v1/users/{id}/status:
 *   put:
 *     summary: Toggle user active/deactive status (Admin)
 *     tags: [Users]
 */
router.put('/:id/status', authorize('Admin'), toggleUserStatus);

export default router;
