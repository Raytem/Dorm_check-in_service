import { LoginResponse } from '@domain/adapters/services/auth-service';
import * as AuthApi from '@infrastructure/api/auth/responses';

export class LoginResponseMapper {
  static toDomain(apiLoginResponse: AuthApi.LoginResponse): LoginResponse {
    return {
      accessToken: apiLoginResponse.accessToken,
      refreshToken: apiLoginResponse.refreshToken,
    };
  }
}
