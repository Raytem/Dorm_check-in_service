import { ILogger } from '@domain/logger/logger.interface.ts';
import { StringUtil } from '@infrastructure/utils/string.util.ts';

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export class LoggerImpl implements ILogger {
  private static readonly dateFormatter = new Intl.DateTimeFormat('en-EN', {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  private static readonly styles: Record<LogLevel, string[]> = {
    [LogLevel.DEBUG]: ['', '', 'color: #00CED1;', 'color: #F0E68C;'],
    [LogLevel.INFO]: ['', '', 'color: #00CED1;', ''],
    [LogLevel.WARN]: [
      'color: #FFD700;',
      'color: #FFD700;',
      'color: #FFD700;',
      'color: #FFD700;',
    ],
    [LogLevel.ERROR]: [
      'color: #F08080;',
      'color: #F08080;',
      'color: #F08080;',
      'color: #F08080;',
    ],
  };

  constructor(private readonly context?: string) {}

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

  private log(level: LogLevel, message: string, ...args: any[]) {
    const timestamp = LoggerImpl.dateFormatter.format(new Date());
    const ctx = this.context ? `[${this.context}]` : '';
    const formattedMessage = StringUtil.formatStringArgs(message, ...args);

    const formattedLog = `%c[${timestamp}]%c[${level.toUpperCase()}] %c${ctx} %c${formattedMessage}`;
    const styles = LoggerImpl.styles[level];

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formattedLog, ...styles);
        break;
      case LogLevel.INFO:
        console.info(formattedLog, ...styles);
        break;
      case LogLevel.WARN:
        console.warn(formattedLog, ...styles);
        break;
      case LogLevel.ERROR:
        console.error(formattedLog, ...styles);
        break;
    }
  }
}
