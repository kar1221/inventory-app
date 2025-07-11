import winston from 'winston';

const { printf, timestamp, combine } = winston.format;

const logDir = 'logs';
const serverStartedTimestamp = new Date().toISOString().replace(/[:.]/g, '-');

const customFormat = printf(({ level, message, timestamp: time, ...meta }) => {
  // serialize any extra fields as JSON
  const metaJson = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
  return `[${level.toUpperCase()}] [${time}] > ${message}${metaJson}`;
});

const logger = winston.createLogger({
  level: 'debug',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), customFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `${logDir}/combined.${serverStartedTimestamp}.log`,
      level: 'info'
    }),
    new winston.transports.File({
      filename: `${logDir}/.${serverStartedTimestamp}.log`,
      level: 'error'
    })
  ]
});

export default logger;
