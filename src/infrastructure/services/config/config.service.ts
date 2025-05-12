import { Config } from './config.type.ts';
import { injectable } from 'inversify';
import { StringUtil } from '@infrastructure/utils/string.util.ts';

@injectable()
export class ConfigService {
  private config: Config = this.initConfig();

  public getConfig(): Config {
    return this.config;
  }

  private initConfig(): Config {
    const appBaseUrl = this.getRequiredEnv('VITE_APP_BASE_URL');
    const authServerBaseUrl = this.getRequiredEnv('VITE_AUTH_BASE_URL');

    return {
      app: {
        title: this.getRequiredEnv('VITE_APP_TITLE'),
        baseUrl: appBaseUrl,
        loginRedirectUrl: StringUtil.joinStr(
          appBaseUrl,
          this.getRequiredEnv('VITE_APP_LOGIN_REDIRECT_PATH'),
        ),
        logoutRedirectUrl: StringUtil.joinStr(
          appBaseUrl,
          this.getRequiredEnv('VITE_APP_LOGOUT_REDIRECT_PATH'),
        ),
      },
      authServer: {
        baseUrl: authServerBaseUrl,
        loginUrl: StringUtil.joinStr(
          authServerBaseUrl,
          this.getRequiredEnv('VITE_AUTH_LOGIN_PATH'),
        ),
        logoutUrl: StringUtil.joinStr(
          authServerBaseUrl,
          this.getRequiredEnv('VITE_AUTH_LOGOUT_PATH'),
        ),
        forbiddenUrl: StringUtil.joinStr(
          authServerBaseUrl,
          this.getRequiredEnv('VITE_AUTH_FORBIDDEN_PATH'),
        ),
        api: {
          baseUrl: StringUtil.joinStr(
            authServerBaseUrl,
            this.getRequiredEnv('VITE_AUTH_API_BASE_PATH'),
          ),
        },
      },
      backendApi: {
        baseUrl: this.getRequiredEnv('VITE_BACKEND_API_BASE_URL'),
      },
    };
  }

  private getRequiredEnv(name: string): string {
    const value = import.meta.env[name];
    if (value === undefined) {
      throw new Error(`Missing required env variable: ${name}`);
    }
    return value;
  }
}
