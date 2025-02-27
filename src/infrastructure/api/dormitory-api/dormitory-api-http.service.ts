import { inject, injectable } from 'inversify';
import { ConfigService } from '@infrastructure/services';
import axios, { AxiosInstance } from 'axios';

@injectable()
export class DormitoryApiHttpService {
	public readonly instance: AxiosInstance

	constructor(
		@inject(ConfigService)
		private readonly config: ConfigService,
	) {
		const instance = axios.create({
			baseURL: this.config.getConfig().dormitoryApi.baseUrl,
		})

		this.instance = instance
	}
}