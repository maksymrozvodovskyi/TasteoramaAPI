import express from 'express';
import cookieParser from 'cookie-parser';
import pino from 'pino-http';
import cors from 'cors';
import apiRouter from './routes/index.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import swaggerUi from 'swagger-ui-express';
import * as fs from 'node:fs';
import path from 'node:path';

const SWAGGER_DOCUMENT = JSON.parse(
  fs.readFileSync(path.join('docs', 'swagger.json')),
);

const PORT = Number(getEnvVar('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SWAGGER_DOCUMENT));

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(apiRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
