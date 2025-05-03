import { ILogger } from '@domain/logger/logger.interface.ts';

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
    const formatted = `${timestamp} [${level.toUpperCase()}] ${ctx}: ${message}`;

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formatted, ...args);
        break;
      case LogLevel.INFO:
        console.info(formatted, ...args);
        break;
      case LogLevel.WARN:
        console.warn(formatted, ...args);
        break;
      case LogLevel.ERROR:
        console.error(formatted, ...args);
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
