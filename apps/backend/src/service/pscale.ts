import mysql, { Pool } from 'mysql2';
import logger from '../middleware/logger';
import { config } from 'dotenv';
config();
export const dbInit = () => {
  const pool: Pool = mysql.createPool({
    uri: process.env.DATABASE_URL,
    connectionLimit: 10,
  });
  logger.info(`Connected to Planetscale`);
  return pool;
};
