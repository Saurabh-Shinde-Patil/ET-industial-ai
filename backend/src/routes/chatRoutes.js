import express from 'express';
import { handleChatQuery } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

/**
 * @openapi
 * /api/v1/chat:
 *   post:
 *     summary: Conversational RAG Operations Assistant with Citations
 *     tags: [RAG Chat]
 */
router.post('/', handleChatQuery);

export default router;
