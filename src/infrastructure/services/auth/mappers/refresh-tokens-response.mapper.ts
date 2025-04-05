import { TokensResponse } from '@domain/adapters/services/auth-service';
import * as AuthApi from '@infrastructure/api/auth/responses';

export class RefreshTokensResponseMapper {
  static toDomain(apiResponse: AuthApi.RefreshTokensResponse): TokensResponse {
    return {
      accessToken: apiResponse.accessToken,
      refreshToken: apiResponse.refreshToken,
    };
  }
}
