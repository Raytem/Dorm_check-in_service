import { Container } from 'inversify';

// Api Http Services
import { AuthApiHttpService } from '@infrastructure/api/auth';
// App services
import { LocalStorageService, ConfigService } from '@infrastructure/services';
// Repo interfaces
import { IRoomRepository, ITokenRepository } from '@domain/repositories';
// Repositories impl
import { RoomRepository, LocalStorageTokenRepository } from '@infrastructure/repositories';
// Usecases
import { LoginUseCase, LogoutUseCase, RefreshTokensUseCase } from '@/usecases';


const diContainer = new Container()

// Api Http Services
diContainer.bind(AuthApiHttpService).toSelf();
// Api Services

// App Services
diContainer.bind(ConfigService).toSelf().inSingletonScope()
diContainer.bind(LocalStorageService).toSelf()
// Repositories
diContainer.bind<ITokenRepository>(ITokenRepository.$).to(LocalStorageTokenRepository)
diContainer.bind<IRoomRepository>(IRoomRepository.$).to(RoomRepository)
// UseCases
diContainer.bind(LoginUseCase).toSelf()
diContainer.bind(LogoutUseCase).toSelf()
diContainer.bind(RefreshTokensUseCase).toSelf()

export { diContainer }