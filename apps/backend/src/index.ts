import cors from 'cors';
import express, { Express } from 'express';
import logger from './middleware/logger';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { tokenRouter } from 'routes';

config();

const PORT = process.env.PORT || 8000;
const basePath = '/api/v1';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(basePath + '/token', tokenRouter);

const server = app.listen(PORT, () => {
  logger.log('info', `Server is running on Port:${PORT}`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.');
  logger.info('Closing server.');
  server.close((err) => {
    logger.info('Server closed.');
    // eslint-disable-next-line no-process-exit
    process.exit(err ? 1 : 0);
  });
});
