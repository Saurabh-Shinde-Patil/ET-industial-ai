import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './src/config/db.js';
import logger from './src/config/logger.js';
import { checkAIServiceHealth } from './src/services/aiServiceProxy.js';
import { setupSwagger } from './src/config/swagger.js';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import auditRoutes from './src/routes/auditRoutes.js';
import assetRoutes from './src/routes/assetRoutes.js';
import documentRoutes from './src/routes/documentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Parsing Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Connect to MongoDB
connectDB();

// Mount OpenAPI Swagger UI Documentation
setupSwagger(app);

// Mount API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/audit-logs', auditRoutes);
app.use('/api/v1/assets', assetRoutes);
app.use('/api/v1/documents', documentRoutes);

/**
 * @openapi
 * /health:
 *   get:
 *     summary: API Gateway Health Status
 *     description: Returns operational status of the REST API Gateway.
 *     responses:
 *       200:
 *         description: System operational
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'Industrial Knowledge Intelligence API Gateway',
    status: 'Operational',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
  });
});

/**
 * @openapi
 * /api/v1/ai-health:
 *   get:
 *     summary: AI Microservice Connectivity Status
 *     description: Proxies health check request to Python FastAPI AI service.
 *     responses:
 *       200:
 *         description: Connectivity status payload
 */
app.get('/api/v1/ai-health', async (req, res) => {
  const aiHealth = await checkAIServiceHealth();
  res.status(200).json({
    success: true,
    gatewayStatus: 'Operational',
    aiService: aiHealth,
  });
});

// Standard API Root
app.get('/api/v1', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Industrial Knowledge Intelligence REST API v1',
    documentation: '/docs',
  });
});

// Global 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Endpoint Not Found: ${req.method} ${req.originalUrl}`,
    error: 'NotFoundError',
  });
});

// Global Error Envelope Middleware
app.use((err, req, res, next) => {
  logger.error(`Global Error: ${err.message}`, { stack: err.stack });
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: err.name || 'ServerError',
    timestamp: new Date().toISOString(),
  });
});

// Start Server
app.listen(PORT, () => {
  logger.info(`Industrial API Gateway running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  logger.info(`OpenAPI Swagger documentation available at http://localhost:${PORT}/docs`);
});
