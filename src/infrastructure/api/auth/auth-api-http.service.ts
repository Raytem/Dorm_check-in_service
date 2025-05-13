import { inject, injectable } from 'inversify';

import axios, { AxiosInstance } from 'axios';

import { ConfigService } from '@infrastructure/services';

@injectable()
export class AuthApiHttpService {
  public readonly instance: AxiosInstance;

  constructor(
    @inject(ConfigService)
    private readonly config: ConfigService,
  ) {
    this.instance = this.initInstance();
  }

  private initInstance(): AxiosInstance {
    return axios.create({
      baseURL: this.config.getConfig().authServer.api.baseUrl,
      withCredentials: true,
    });
  }
}
