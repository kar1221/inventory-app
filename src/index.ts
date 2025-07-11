import app from './app.js';
import env from './env.js';
import logger from './logger.js';

const { PORT } = env;

const server = app.listen(PORT, () => {
  logger.info(`Server started on port: ${PORT}`);
});

server.on('error', (error) => {
  logger.error(error);
  throw error;
});
