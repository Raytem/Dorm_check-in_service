import { inject, injectable } from 'inversify';

import axios, { AxiosInstance, HttpStatusCode } from 'axios';

import { ConfigService } from '@infrastructure/services';
import { ITokenRepository } from '@domain/repositories';
import { RefreshTokensUseCase } from '@/usecases/auth';
import { diContainer } from '@/di';
import { ILogger } from '@domain/logger/logger.interface.ts';

@injectable()
export class AuthApiHttpService {
  public readonly instance: AxiosInstance;
  private readonly logger: ILogger;

  constructor(
    @inject(ConfigService)
    private readonly config: ConfigService,
    @inject(ILogger.$)
    private readonly baseLogger: ILogger,
    @inject(ITokenRepository.$)
    private readonly tokenRepository: ITokenRepository,
  ) {
    this.logger = this.baseLogger.withContext(AuthApiHttpService.name);

    const instance = axios.create({
      baseURL: this.config.getConfig().authApi.baseUrl,
      transformRequest: (data, headers) => {
        const accessToken = this.tokenRepository.getAccessToken();
        if (accessToken) {
          headers.setAuthorization(`Bearer ${accessToken}`, true);
        }
        return data;
      },
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const isUnauthorized =
          error.response?.status === HttpStatusCode.Unauthorized;

        if (isUnauthorized && !originalRequest._isRetry) {
          originalRequest._isRetry = true;
          try {
            // refresh tokens
            await diContainer.get(RefreshTokensUseCase).execute();
            // retry request
            return instance.request(originalRequest);
          } catch (e) {
            this.logger.error('Error', e);
          }
        }
        return Promise.reject(error);
      },
    );

    this.instance = instance;
  }
}
