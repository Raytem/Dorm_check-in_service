import { inject, injectable } from 'inversify';

import axios, { AxiosInstance } from 'axios';

import { ConfigService } from '@infrastructure/services';
import { ITokenRepository } from '@domain/repositories';

@injectable()
export class AuthApiHttpService {
  public readonly instance: AxiosInstance;

  constructor(
    @inject(ConfigService)
    private readonly config: ConfigService,
    @inject(ITokenRepository.$)
    private readonly tokenRepository: ITokenRepository,
  ) {
    this.instance = this.initInstance();
  }

  private initInstance(): AxiosInstance {
    return axios.create({
      baseURL: this.config.getConfig().authServer.api.baseUrl,

      transformRequest: (data, headers) => {
        const accessToken = this.tokenRepository.getAccessToken();
        if (accessToken) {
          headers.setAuthorization(`Bearer ${accessToken}`, true);
        }
        return data;
      },
    });
  }
}
