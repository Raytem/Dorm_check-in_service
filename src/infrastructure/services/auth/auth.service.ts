import { inject } from 'inversify';

import {
  AuthorizationCheckResult,
  IAuthService,
} from '@domain/adapters/services/auth-service';

import * as AuthApi from '@infrastructure/api/auth';
import { AppException, ERROR_MESSAGES } from '@domain/adapters/exceptions';

import { UserProfileMapper } from './mappers';
import { isAxiosError } from 'axios';
import { ConfigService } from '@infrastructure/services';
import { Role } from '@domain/enums';
import { AuthenticatedUserEntity } from '@domain/entities';

export class AuthService implements IAuthService {
  constructor(
    @inject(ConfigService)
    private readonly config: ConfigService,
    @inject(AuthApi.AuthApiHttpService)
    private readonly authApiHttpService: AuthApi.AuthApiHttpService,
  ) {}

  async checkAuthorization(): Promise<AuthorizationCheckResult> {
    try {
      const res = await this.authApiHttpService.instance.post(
        '/users/hasAuthority',
        [Role.CIT, Role.DEPUTY_DEAN, Role.HOSTEL, Role.STUDENT], // TODO: удалить после тестов STUDENT
      );

      return {
        isAuthorized: true,
        statusCode: res.status,
      };
    } catch (e) {
      const statusCode = isAxiosError(e) ? (e.response?.status ?? 500) : 500;
      return {
        isAuthorized: false,
        statusCode,
      };
    }
  }

  async getUserProfile(): Promise<AuthenticatedUserEntity> {
    try {
      const response =
        await this.authApiHttpService.instance.get<AuthApi.UserProfileResponse>(
          '/users/me',
        );

      return UserProfileMapper.toDomain(
        response.data,
        this.config.getConfig().authServer.baseUrl,
      );
    } catch (error) {
      throw new AppException(ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR, error);
    }
  }

  redirectToLogin() {
    window.location.href = this.getSSOLoginLink();
  }

  logout() {
    window.location.href = this.getSSOLogoutLink();
  }

  redirectToForbidden() {
    window.location.href = this.config.getConfig().authServer.forbiddenUrl;
  }

  private getSSOLoginLink() {
    const redirectUrl = this.config.getConfig().app.loginRedirectUrl;
    return `${this.config.getConfig().authServer.loginUrl}?redirectUrl=${redirectUrl}`;
  }

  private getSSOLogoutLink() {
    const redirectUrl = this.config.getConfig().app.logoutRedirectUrl;
    return `${this.config.getConfig().authServer.logoutUrl}?redirectUrl=${redirectUrl}`;
  }
}
