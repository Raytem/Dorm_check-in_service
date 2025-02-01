import "reflect-metadata";
import { Container } from 'inversify';

// Api Http Services
import { AuthApiHttpService } from '@infrastructure/api/auth';
// App services'
import { IAuthService } from '@domain/adapters/services/auth-service';
import { LocalStorageService, ConfigService, UINotificationService } from '@infrastructure/services';
import { AuthService } from '@infrastructure/services/auth';
// Repo interfaces
import { IRoomRepository, ITokenRepository } from '@domain/repositories';
// Repositories impl
import { RoomRepository, LocalStorageTokenRepository } from '@infrastructure/repositories';
// Usecases
import { LoginUseCase, LogoutUseCase, RefreshTokensUseCase } from '@/usecases';
import { IUINotificationService } from '@domain/adapters/services/ui-notification';


const diContainer = new Container()

// Api Http Services
diContainer.bind(AuthApiHttpService).toSelf();
// Api Services
// App Services
diContainer.bind(IUINotificationService.$).to(UINotificationService).inSingletonScope()
diContainer.bind(IAuthService.$).to(AuthService)
diContainer.bind(ConfigService).toSelf().inSingletonScope()
diContainer.bind(LocalStorageService).toSelf()
// Repositories
diContainer.bind(ITokenRepository.$).to(LocalStorageTokenRepository)
diContainer.bind(IRoomRepository.$).to(RoomRepository)
// UseCases
diContainer.bind(LoginUseCase).toSelf()
diContainer.bind(LogoutUseCase).toSelf()
diContainer.bind(RefreshTokensUseCase).toSelf()

export { diContainer }