import { interfaces } from 'inversify';
import { AuthenticatedUserEntity } from '@domain/entities';
import { AuthorizationCheckResult } from '@domain/adapters/services/auth-service/auth-service.types.ts';

export interface IAuthService {
  checkAuthorization(): Promise<AuthorizationCheckResult>;
  getUserProfile(): Promise<AuthenticatedUserEntity>;
  redirectToLogin(): void;
  redirectToForbidden(): void;
  logout(): void;
}

export namespace IAuthService {
  export const $: interfaces.ServiceIdentifier<IAuthService> =
    Symbol('IAuthService');
}
