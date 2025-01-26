import { inject, injectable } from 'inversify';

import { ITokenRepository } from '@domain/repositories';


@injectable()
export class RefreshTokensUseCase {
	constructor(
		@inject(ITokenRepository.$)
		private readonly tokenRepository: ITokenRepository,
	) {
	}

	async execute() {
		// TODO: api call, get token

		this.tokenRepository.setAccessToken('new token')
	}
}