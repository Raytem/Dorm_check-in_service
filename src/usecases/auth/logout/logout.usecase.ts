import { inject, injectable } from 'inversify';

import { ITokenRepository } from '@domain/repositories';


@injectable()
export class LogoutUseCase {
	constructor(
		@inject(ITokenRepository.$)
		private readonly tokenRepository: ITokenRepository,
	) {
	}

	async execute(): Promise<void> {
		//TODO: logout request
		this.tokenRepository.removeAccessToken()
	}
}