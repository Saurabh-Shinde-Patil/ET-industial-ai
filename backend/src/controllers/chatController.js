import logger from '../config/logger.js';
import { logAuditEvent } from '../middleware/auditLogger.js';
import { generateRAGResponseFromAI } from '../services/aiServiceProxy.js';

/**
 * @desc    Process conversational RAG query with citations & confidence meter
 * @route   POST /api/v1/chat
 * @access  Private
 */
export const handleChatQuery = async (req, res, next) => {
  try {
    const { query, assetId } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Query statement is required',
        error: 'ValidationError',
      });
    }

    let ragResult;
    try {
      ragResult = await generateRAGResponseFromAI(query, assetId);
    } catch (aiErr) {
      logger.warn(`AI RAG Microservice fallback: ${aiErr.message}`);
      ragResult = {
        answer: 'I cannot answer this question based on the ingested industrial documents. The Python AI service is currently unreachable.',
        confidence_score: 0.0,
        confidence_level: 'Low Confidence / Suppressed',
        citations: [],
      };
    }

    // Log low confidence queries (< 60%) to audit logs for Knowledge Admin review
    if (ragResult.confidence_score < 60.0) {
      logAuditEvent(
        req.user._id,
        'LOW_CONFIDENCE_QUERY',
        `User '${req.user.username}' queried '${query}' (Confidence: ${ragResult.confidence_score}%)`,
        req.ip
      );
    }

    res.status(200).json({
      success: true,
      query,
      answer: ragResult.answer,
      confidenceScore: ragResult.confidence_score,
      confidenceLevel: ragResult.confidence_level,
      citations: ragResult.citations || [],
    });
  } catch (error) {
    next(error);
  }
};
