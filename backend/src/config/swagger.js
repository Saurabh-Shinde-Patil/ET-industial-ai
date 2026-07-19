import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Industrial Knowledge Intelligence REST API Gateway',
      version: '1.1.0',
      description:
        'OpenAPI 3.0 specification for Industrial Knowledge Brain, Physical Asset Graph, Document Ingestion, and RAG Engine.',
      contact: {
        name: 'Enterprise AI Architecture Team',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local API Gateway',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./server.js', './src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
