import 'dotenv/config';
import { z } from 'zod/v4';

import logger from './logger.js';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000)
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
