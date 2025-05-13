import { interfaces } from 'inversify';

export interface ITokenRepository {
  getAccessToken(): string | null;
  // setAccessToken(accessToken: string): void;
  // removeAccessToken(): void;
}
export namespace ITokenRepository {
  export const $: interfaces.ServiceIdentifier<ITokenRepository> =
    Symbol('TokenRepository');
}
