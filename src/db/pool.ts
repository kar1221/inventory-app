import { Pool } from 'pg';

import env from '../env';

const pool = new Pool({
  database: env.DB_DATABASE,
  user: env.DB_USER,
  password: env.DB_PASSW,
  port: env.DB_PORT,
  host: env.DB_HOST
});

export default pool;
