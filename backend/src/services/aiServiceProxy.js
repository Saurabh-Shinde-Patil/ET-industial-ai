import axios from 'axios';
import logger from '../config/logger.js';
import dotenv from 'dotenv';
import fs from 'fs';
import FormData from 'form-data';

dotenv.config();

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

/**
 * Proxy health check to Python FastAPI AI service
 */
export const checkAIServiceHealth = async () => {
  try {
    const response = await axios.get(`${AI_SERVICE_URL}/health`, { timeout: 3000 });
    return {
      status: 'Online',
      details: response.data,
    };
  } catch (error) {
    logger.warn(`AI Microservice health check failed: ${error.message}`);
    return {
      status: 'Offline',
      error: error.message,
    };
  }
};

/**
 * Call Python FastAPI text & OCR extraction service for a file
 */
export const extractDocumentTextFromAI = async (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found at path: ${filePath}`);
    }

    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const response = await axios.post(`${AI_SERVICE_URL}/extract`, formData, {
      headers: formData.getHeaders(),
      timeout: 30000,
    });

    return response.data;
  } catch (error) {
    logger.error(`AI Document Extraction proxy failed: ${error.message}`);
    throw error;
  }
};
