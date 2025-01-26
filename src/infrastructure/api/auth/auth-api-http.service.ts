import axios, { AxiosInstance, HttpStatusCode } from 'axios';
import { inject, injectable } from 'inversify';
import { ConfigService } from '@infrastructure/services';
import { ITokenRepository } from '@domain/repositories';
import { RefreshTokensUseCase } from '@/usecases';

@injectable()
export class AuthApiHttpService {
	public readonly instance: AxiosInstance

	constructor(
		@inject(ConfigService)
		private readonly config: ConfigService,
		@inject(ITokenRepository.$)
		private readonly tokenRepository: ITokenRepository,
		@inject(RefreshTokensUseCase)
		private readonly refreshTokensUseCase: RefreshTokensUseCase
	) {
		const instance = axios.create({
			baseURL: this.config.getConfig().authApi.baseUrl,
			transformRequest: (data, headers) => {
				const accessToken = this.tokenRepository.getAccessToken()
				if (accessToken) {
					headers.setAuthorization(`Bearer ${accessToken}`, true)
				}
				return data
			}
		})

		const maxUnauthorizedRetryCount = 1
		instance.interceptors.response.use(
			(response) => {
				return response
			},
			async (error) => {
				const originalRequest = error.config
				const isUnauthorized = error.status === HttpStatusCode.Unauthorized

				if (!originalRequest._unauthorizedRetryCount) {
					originalRequest._unauthorizedRetryCount = 0
				}

				if (
					isUnauthorized &&
					originalRequest._unauthorizedRetryCount < maxUnauthorizedRetryCount
				) {
					// refresh tokens
					await this.refreshTokensUseCase.execute()

					// retry request
					return instance(originalRequest)
				}

				// throw an error
				return Promise.reject(error);
			}
		)

		this.instance = instance
	}
}