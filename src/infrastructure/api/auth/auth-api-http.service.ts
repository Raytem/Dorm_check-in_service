import { inject, injectable } from 'inversify';

import axios, { AxiosInstance, HttpStatusCode } from 'axios';

import { ConfigService } from '@infrastructure/services';
import { ITokenRepository } from '@domain/repositories';
import { RefreshTokensUseCase } from '@/usecases';
import { diContainer } from '@/di';

@injectable()
export class AuthApiHttpService {
  public readonly instance: AxiosInstance;

  constructor(
    @inject(ConfigService)
    private readonly config: ConfigService,
    @inject(ITokenRepository.$)
    private readonly tokenRepository: ITokenRepository,
  ) {
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
            console.log(e);
          }
        }
        return Promise.reject(error);
      },
    );

    this.instance = instance;
  }
}
