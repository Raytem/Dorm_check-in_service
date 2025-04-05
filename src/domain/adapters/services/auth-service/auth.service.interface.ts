import { interfaces } from 'inversify';
import { LoginDto } from './dto';
import { LoginResponse, TokensResponse } from './responses';

export interface IAuthService {
  login(dto: LoginDto): Promise<LoginResponse>;
  logout(): Promise<void>;
  refreshTokens(): Promise<TokensResponse>;
}

export namespace IAuthService {
  export const $: interfaces.ServiceIdentifier<IAuthService> =
    Symbol('IAuthService');
}
