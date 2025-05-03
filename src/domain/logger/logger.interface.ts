import { interfaces } from 'inversify';

export interface ILogger {
  debug(message: string, ...args: any[]): void;

  info(message: string, ...args: any[]): void;

  warning(message: string, ...args: any[]): void;

  error(message: string, ...args: any[]): void;

  withContext(context: string): ILogger;
}

export namespace ILogger {
  export const $: interfaces.ServiceIdentifier<ILogger> = Symbol('Logger');
}
