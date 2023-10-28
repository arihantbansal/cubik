import winston, { format } from 'winston';

export const prettyJSON = (data: unknown) => JSON.stringify(data, null, 2);

const alignedWithColorsAndTime = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const options = {
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// Don't enable slack in testing
const transports: winston.transport[] = [];

const logger = winston.createLogger({
  level: 'info',
  format: alignedWithColorsAndTime,
  transports: [new winston.transports.Console(options.console), ...transports],
  exitOnError: false,
});

export default logger;
