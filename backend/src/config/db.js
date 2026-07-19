import mongoose from 'mongoose';
import logger from './logger.js';

/**
 * Connect to MongoDB database instance
 */
export const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/et_industrial_ai';
    const conn = await mongoose.connect(connStr);
    logger.info(`MongoDB Connected successfully to Host: ${conn.connection.host}, DB: ${conn.connection.name}`);
  } catch (error) {
    logger.error(`MongoDB Connection Failed: ${error.message}`);
    // In dev mode, log warning but do not crash process immediately if database is offline
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};
