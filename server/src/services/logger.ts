import { createLogger, format, Logger, LoggerOptions, transports } from 'winston';
import { Format } from 'logform';

const { combine, timestamp, colorize, printf } = format;
const colorizer = colorize();
const isProduction = process.env.NODE_ENV === 'production';

const defaultLevel: string = process.env.LOG_LEVEL;
const defaultFormat: Format = combine(
  timestamp(),
  printf(({ level, message, timestamp }) => {
    return colorizer.colorize(level, `${timestamp} [${level}]: `) + message;
  }),
);

const devLogging: LoggerOptions = {
  exitOnError: false,
  level: defaultLevel,
  transports: [
    new transports.Console({
      format: defaultFormat,
      level: 'debug',
    }),
  ],
};

const prodLogging: LoggerOptions = {
    exitOnError: false,
    level: defaultLevel,
    transports: [
      new transports.File({
        format: defaultFormat,
        filename: 'logs/info.log',
        level: 'info',
      }),
      new transports.File({
        format: defaultFormat,
        filename: 'logs/error.log',
        level: 'error',
      }),
    ],
    exceptionHandlers: new transports.File({ filename: 'logs/exceptions.log' }),
};

const logger: Logger = createLogger(isProduction ? prodLogging : devLogging);

export default logger;