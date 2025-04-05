import { inject, injectable } from 'inversify';

import { ITokenRepository } from '@domain/repositories';
import { IAuthService } from '@domain/adapters/services/auth-service';

@injectable()
export class RefreshTokensUseCase {
  constructor(
    @inject(ITokenRepository.$)
    private readonly tokenRepository: ITokenRepository,
    @inject(IAuthService.$)
    private readonly authService: IAuthService,
  ) {}

  async execute() {
    const tokens = await this.authService.refreshTokens();

    this.tokenRepository.setAccessToken(tokens.accessToken);
  }
}
