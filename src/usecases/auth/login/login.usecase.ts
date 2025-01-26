import { inject, injectable } from 'inversify';

import { ITokenRepository } from '@domain/repositories';

import { LoginDto } from './dto';
import { AuthenticatedUserEntity } from '@domain/entities';


@injectable()
export class LoginUseCase {
	constructor(
		@inject(ITokenRepository.$)
		private readonly tokenRepository: ITokenRepository,
	) {}

	async execute(dto: LoginDto): Promise<AuthenticatedUserEntity> {
		this.tokenRepository.setAccessToken(`${dto.email}=${dto.password}`)

		return new AuthenticatedUserEntity(1, '', '', '', [])
	}
}