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
import { IUINotificationService } from '@domain/adapters/services/ui-notification';
// Repo interfaces
import {
  IResidentRepository,
  IRoomRepository,
  ITokenRepository,
} from '@domain/repositories';
// Repositories impl
import {
  MockRoomRepository,
  LocalStorageTokenRepository,
  MockResidentRepository,
} from '@infrastructure/repositories';
// Usecases
import {
  LoginUseCase,
  LogoutUseCase,
  RefreshTokensUseCase,
} from '@usecases/auth';
import {
  GetRoomsUseCase,
  GetRoomDetailsUseCase,
  EvictResidentUseCase,
  GetAvailableRoomsToRelocateResidentUseCase,
  UpdateResidentInfoUseCase,
  RelocateResidentUseCase,
  AddResidentUseCase,
} from '@usecases/rooms';
import { GetCandidatesForRoomUseCase } from '@usecases/residents';
// Core
import { ILogger } from '@domain/logger/logger.interface.ts';
import { LoggerImpl } from '@infrastructure/logger/logger.ts';

const diContainer = new Container();

// Api Http Services
diContainer.bind(AuthApiHttpService).toSelf();
diContainer.bind(DormitoryApiHttpService).toSelf();
// Api Services
diContainer.bind(RoomService).toSelf();
// Core
diContainer.bind(ILogger.$).to(LoggerImpl);
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
diContainer.bind(IResidentRepository.$).to(MockResidentRepository);
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
diContainer.bind(GetCandidatesForRoomUseCase).toSelf();
diContainer.bind(AddResidentUseCase).toSelf();

export { diContainer };
