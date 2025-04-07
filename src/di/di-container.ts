import 'reflect-metadata';
import { Container } from 'inversify';

// Api Http Services
import { AuthApiHttpService } from '@infrastructure/api/auth';
import { DormitoryApiHttpService } from '@infrastructure/api/dormitory-api';
// Api services
import { RoomService } from '@infrastructure/api/dormitory-api/services/room';
// App services'
import { IAuthService } from '@domain/adapters/services/auth-service';
import {
  LocalStorageService,
  ConfigService,
  UINotificationService,
} from '@infrastructure/services';
import { AuthService } from '@infrastructure/services/auth';
// Repo interfaces
import { IRoomRepository, ITokenRepository } from '@domain/repositories';
// Repositories impl
import {
  MockRoomRepository,
  LocalStorageTokenRepository,
} from '@infrastructure/repositories';
// Usecases
import {
  LoginUseCase,
  LogoutUseCase,
  RefreshTokensUseCase,
  GetRoomsUseCase,
  GetRoomDetailsUseCase,
  EvictResidentUseCase,
  GetAvailableRoomsToRelocateResidentUseCase,
  UpdateResidentInfoUseCase,
  RelocateResidentUseCase,
} from '@/usecases';
import { IUINotificationService } from '@domain/adapters/services/ui-notification';

const diContainer = new Container();

// Api Http Services
diContainer.bind(AuthApiHttpService).toSelf();
diContainer.bind(DormitoryApiHttpService).toSelf();
// Api Services
diContainer.bind(RoomService).toSelf();
// App Services
diContainer
  .bind(IUINotificationService.$)
  .to(UINotificationService)
  .inSingletonScope();
diContainer.bind(IAuthService.$).to(AuthService);
diContainer.bind(ConfigService).toSelf().inSingletonScope();
diContainer.bind(LocalStorageService).toSelf();
// Repositories
diContainer.bind(ITokenRepository.$).to(LocalStorageTokenRepository);
diContainer.bind(IRoomRepository.$).to(MockRoomRepository);
// UseCases
diContainer.bind(LoginUseCase).toSelf();
diContainer.bind(LogoutUseCase).toSelf();
diContainer.bind(RefreshTokensUseCase).toSelf();
diContainer.bind(GetRoomsUseCase).toSelf();
diContainer.bind(GetRoomDetailsUseCase).toSelf();
diContainer.bind(EvictResidentUseCase).toSelf();
diContainer.bind(RelocateResidentUseCase).toSelf();
diContainer.bind(GetAvailableRoomsToRelocateResidentUseCase).toSelf();
diContainer.bind(UpdateResidentInfoUseCase).toSelf();

export { diContainer };
