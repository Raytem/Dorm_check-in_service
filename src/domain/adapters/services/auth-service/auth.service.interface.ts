import { interfaces } from 'inversify';
import { Role } from '@domain/enums';
import { AuthenticatedUserEntity } from '@domain/entities';

export interface IAuthService {
  checkAuthorization(roles: Role[]): Promise<boolean>;
  getUserProfile(): Promise<AuthenticatedUserEntity>;
  redirectToLogin(): void;
  logout(): void;
}

export namespace IAuthService {
  export const $: interfaces.ServiceIdentifier<IAuthService> =
    Symbol('IAuthService');
}
