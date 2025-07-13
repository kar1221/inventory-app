import pool from './pool';
import logger from '../logger';

import type { QueryResultRow } from 'pg';

class DatabaseError extends Error {
  public originalError: unknown;

  constructor(message: string, original: unknown) {
    super(message);

    this.name = 'DatabaseError';
    this.originalError = original;
  }
}

async function query<T extends QueryResultRow>(
  sql: string,
  params: unknown[] = []
): Promise<{ rows: T[] }> {
  try {
    return await pool.query<T>(sql, params);
  } catch (error: unknown) {
    logger.error('DB query failed', {
      sql,
      params
    });

    throw new DatabaseError('Failed to execute database query', error);
  }
}

export { DatabaseError, query };
