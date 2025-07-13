import 'dotenv/config';
import { z } from 'zod/v4';

import logger from './logger.js';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DB_HOST: z.coerce.string(),
  DB_PORT: z.coerce.number(),
  DB_USER: z.coerce.string(),
  DB_PASSW: z.coerce.string(),
  DB_DATABASE: z.coerce.string()
});

try {
  envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    const bad = error.issues
      .flatMap((i) => i.path.join('.'))
      .filter(Boolean)
      .join(', ');

    logger.error(error);

    throw new Error(`Invalid of missing enviroment variable: ${bad}`);
  }

  throw error;
}

export default envSchema.parse(process.env);
