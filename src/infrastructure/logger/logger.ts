import { ILogger } from '@domain/logger/logger.interface.ts';
import { StringUtil } from '@infrastructure/utils/string.util.ts';

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export class LoggerImpl implements ILogger {
  constructor(private readonly context?: string) {}

  private log(level: LogLevel, message: string, ...args: any[]) {
    const timestamp = new Date().toISOString();
    const ctx = this.context ? `[${this.context}]` : '';
    const formattedMessage = StringUtil.formatStringArgs(message, ...args);

    const formattedLog = `${timestamp} [${level.toUpperCase()}] ${ctx}: ${formattedMessage}`;

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(`%c${formattedLog}`, 'color: violet');
        break;
      case LogLevel.INFO:
        console.info(`%c${formattedLog}`, 'color: skyblue');
        break;
      case LogLevel.WARN:
        console.warn(`%c${formattedLog}`, 'color: yellow');
        break;
      case LogLevel.ERROR:
        console.error(`%c${formattedLog}`, 'color: red');
        break;
    }
  }

  debug(message: string, ...args: any[]) {
    this.log(LogLevel.DEBUG, message, ...args);
  }

  info(message: string, ...args: any[]) {
    this.log(LogLevel.INFO, message, ...args);
  }

  warning(message: string, ...args: any[]) {
    this.log(LogLevel.WARN, message, ...args);
  }

  error(message: string, ...args: any[]) {
    this.log(LogLevel.ERROR, message, ...args);
  }

  withContext(context: string): ILogger {
    return new LoggerImpl(context);
  }
}
