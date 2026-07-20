import express from 'express';
import {
  getAssetTree,
  getAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
  seedAssets,
} from '../controllers/assetController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/rbacMiddleware.js';

const router = express.Router();

router.use(protect);

/**
 * @openapi
 * /api/v1/assets/tree:
 *   get:
 *     summary: Retrieve hierarchical plant asset tree
 *     tags: [Assets]
 */
router.get('/tree', getAssetTree);

/**
 * @openapi
 * /api/v1/assets/seed:
 *   post:
 *     summary: Seed initial 10 physical industrial demo assets
 *     tags: [Assets]
 */
router.post('/seed', seedAssets);

/**
 * @openapi
 * /api/v1/assets:
 *   get:
 *     summary: Query assets list with search & category filters
 *     tags: [Assets]
 *   post:
 *     summary: Create a new plant asset node
 *     tags: [Assets]
 */
router.route('/')
  .get(getAssets)
  .post(createAsset);

/**
 * @openapi
 * /api/v1/assets/{id}:
 *   get:
 *     summary: Fetch single asset profile details
 *     tags: [Assets]
 *   put:
 *     summary: Update asset details and specs
 *     tags: [Assets]
 *   delete:
 *     summary: Delete asset node (Admin only)
 *     tags: [Assets]
 */
router.route('/:id')
  .get(getAssetById)
  .put(updateAsset)
  .delete(authorize('Admin'), deleteAsset);

export default router;
