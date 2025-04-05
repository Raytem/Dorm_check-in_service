import { inject, injectable } from 'inversify';

import { ITokenRepository } from '@domain/repositories';
import { IAuthService, LoginDto } from '@domain/adapters/services/auth-service';
import { AuthenticatedUserEntity } from '@domain/entities';

@injectable()
export class LoginUseCase {
  constructor(
    @inject(ITokenRepository.$)
    private readonly tokenRepository: ITokenRepository,
    @inject(IAuthService.$)
    private readonly authService: IAuthService,
  ) {}

  async execute(dto: LoginDto): Promise<AuthenticatedUserEntity> {
    const loginResponse = await this.authService.login(dto);

    this.tokenRepository.setAccessToken(loginResponse.accessToken);

    return new AuthenticatedUserEntity(
      1,
      'Даниил',
      'Баков',
      'Сергеевич',
      'daniilbakov',
      null,
      'daniilbk@yandex.by',
      [],
    ); // TODO: get user info from api and return it
  }
}
