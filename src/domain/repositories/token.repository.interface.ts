import { interfaces } from 'inversify';

export interface ITokenRepository {
  setAccessToken(accessToken: string): void;
  getAccessToken(): string | null;
  removeAccessToken(): void;
}
export namespace ITokenRepository {
  export const $: interfaces.ServiceIdentifier<ITokenRepository> =
    Symbol('ITokenRepository');
}
