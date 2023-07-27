import mysql, { Pool } from 'mysql2';
import logger from '../middleware/logger';
import { config } from 'dotenv';
config();
export const dbInit = () => {
  const pool: Pool = mysql.createPool({
    uri: 'mysql://ydbq6oqssbpiq5nj63bz:pscale_pw_2yi2xQiCYLOnVWWI8J3vH3eswfrDObbznvMIpr4SkHA@aws.connect.psdb.cloud/cubik?ssl={"rejectUnauthorized":true}',
    connectionLimit: 10,
  });
  logger.info(`Connected to Planetscale`);
  return pool;
};
