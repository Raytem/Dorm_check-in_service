import { Config } from './config.type.ts';

export class ConfigService {
	private config: Config

	constructor() {
		const env = import.meta.env;
		this.config = {
			app: {
				title: env.VITE_APP_TITLE ?? ''
			},
			authApi: {
				baseUrl: env.VITE_AUTH_API_BASE_URL ?? ''
			}
		}
	}

	public getConfig(): Config {
		return this.config;
	}
}