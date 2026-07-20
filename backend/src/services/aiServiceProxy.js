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

/**
 * Generate 384-dimensional vector embedding for text
 */
export const generateEmbeddingFromAI = async (text) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/embed`, { text }, { timeout: 10000 });
    return response.data.embedding;
  } catch (error) {
    logger.error(`AI Embedding proxy failed: ${error.message}`);
    throw error;
  }
};

/**
 * Chunk industrial document text and generate 384-dim vector embeddings
 */
export const chunkAndEmbedDocumentFromAI = async (documentId, text) => {
  try {
    const response = await axios.post(
      `${AI_SERVICE_URL}/embed/chunk`,
      {
        document_id: documentId,
        text,
        chunk_size: 500,
        chunk_overlap: 100,
      },
      { timeout: 60000 }
    );
    return response.data;
  } catch (error) {
    logger.error(`AI Chunk & Embed proxy failed: ${error.message}`);
    throw error;
  }
};
