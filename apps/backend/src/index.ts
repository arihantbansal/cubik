import cors from 'cors';
import express, { Express } from 'express';
import logger from './middleware/logger';
import cookieParser from 'cookie-parser';
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const server = app.listen(3000, () => {
  logger.log('info', `Server is running on Port: 3000`);
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
