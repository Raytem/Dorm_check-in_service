import { inject } from 'inversify';

import { IAuthService } from '@domain/adapters/services/auth-service';

import * as AuthApi from '@infrastructure/api/auth';
import { AppException, ERROR_MESSAGES } from '@domain/adapters/exceptions';

import { UserProfileMapper } from './mappers';
import { HttpStatusCode, isAxiosError } from 'axios';
import { ConfigService } from '@infrastructure/services';
import { ITokenRepository } from '@domain/repositories';
import { Role } from '@domain/enums';
import { AuthenticatedUserEntity } from '@domain/entities';
import { useAppDispatch } from '@application/store';
import { setAuthenticatedUser } from '@application/store/slices';

export class AuthService implements IAuthService {
  constructor(
    @inject(ConfigService)
    private readonly config: ConfigService,
    @inject(ITokenRepository.$)
    private readonly tokenRepository: ITokenRepository,
    @inject(AuthApi.AuthApiHttpService)
    private readonly authApiHttpService: AuthApi.AuthApiHttpService,
  ) {}

  async checkAuthorization(roles: Role[]): Promise<boolean> {
    try {
      await this.authApiHttpService.instance.post('/users/hasAuthority', roles);

      const user = await this.getUserProfile();
      const dispatch = useAppDispatch();
      dispatch(setAuthenticatedUser(user));

      return true;
    } catch (e) {
      if (!isAxiosError(e)) return false;

      if (e.response?.status === HttpStatusCode.Forbidden) {
        this.redirectToForbidden();
      }
      throw e;
    }
  }

  async getUserProfile(): Promise<AuthenticatedUserEntity> {
    try {
      const response =
        await this.authApiHttpService.instance.post<AuthApi.UserProfileResponse>(
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
    this.tokenRepository.removeAccessToken();
    window.location.href = this.getSSOLogoutLink();
  }

  private redirectToForbidden() {
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
