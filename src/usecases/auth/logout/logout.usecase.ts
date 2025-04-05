import { inject, injectable } from 'inversify';

import { ITokenRepository } from '@domain/repositories';
import { IAuthService } from '@domain/adapters/services/auth-service';

@injectable()
export class LogoutUseCase {
  constructor(
    @inject(ITokenRepository.$)
    private readonly tokenRepository: ITokenRepository,
    @inject(IAuthService.$)
    private readonly authService: IAuthService,
  ) {}

  async execute(): Promise<void> {
    await this.authService.logout();
    this.tokenRepository.removeAccessToken();
  }
}
