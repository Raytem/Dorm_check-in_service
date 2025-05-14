import { interfaces } from 'inversify';

export interface ILogger {
  debug(message: string, ...args: any[]): void;

  info(message: string, ...args: any[]): void;

  warning(message: string, ...args: any[]): void;

  error(message: string, ...args: any[]): void;

  setContext(context: string): void;
}

export namespace ILogger {
  export const $: interfaces.ServiceIdentifier<ILogger> = Symbol('Logger');
}
