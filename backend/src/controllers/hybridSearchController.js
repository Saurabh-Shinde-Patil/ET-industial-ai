import logger from '../config/logger.js';
import { searchHybridDatabaseFromAI } from '../services/aiServiceProxy.js';

/**
 * @desc    Perform Hybrid Reciprocal Rank Fusion (BM25 + FAISS) Search
 * @route   POST /api/v1/search/hybrid
 * @access  Private
 */
export const searchHybridIndex = async (req, res, next) => {
  try {
    const { query, topK = 10, assetId } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Search query statement is required',
        error: 'ValidationError',
      });
    }

    let searchResult;
    try {
      searchResult = await searchHybridDatabaseFromAI(query, topK, assetId);
    } catch (err) {
      logger.warn(`AI Hybrid RRF search failed: ${err.message}`);
      searchResult = {
        query,
        match_count: 0,
        matches: [],
      };
    }

    res.status(200).json({
      success: true,
      query,
      matchCount: searchResult.match_count || searchResult.matches?.length || 0,
      matches: searchResult.matches || [],
    });
  } catch (error) {
    next(error);
  }
};
