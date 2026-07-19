import axios from 'axios';
import logger from '../config/logger.js';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

/**
 * Fetch health status from Python FastAPI AI Service microservice
 */
export const checkAIServiceHealth = async () => {
  try {
    const response = await axios.get(`${AI_SERVICE_URL}/health`, { timeout: 5000 });
    return response.data;
  } catch (error) {
    logger.error(`AI Microservice Connection Error: ${error.message}`);
    return {
      status: 'Offline',
      error: error.message,
      url: AI_SERVICE_URL
    };
  }
};
