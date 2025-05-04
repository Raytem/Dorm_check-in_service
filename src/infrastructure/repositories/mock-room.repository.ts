import { inject, injectable } from 'inversify';
import {
  PaginatedData,
  PaginationFilter,
  RoomSearchFilters,
} from '@domain/types';
import {
  ResidentId,
  RoomDetailsEntity,
  RoomEntity,
  RoomId,
} from '@domain/entities';
import { ROOM_MOCK_DATA } from '@domain/mocks';
import { ROOM_DETAILS_MOCK_DATA } from '@domain/mocks/room-details.mock.ts';
import { IRoomRepository } from '@domain/repositories';
import { PaginatedDataMapper } from '@infrastructure/mappers';
import { DelayUtil } from 'infrastructure/utils';
import { ILogger } from '@domain/logger/logger.interface.ts';

@injectable()
export class MockRoomRepository implements IRoomRepository {
  private logger: ILogger;

  constructor(
    @inject(ILogger.$)
    private readonly baseLogger: ILogger,
  ) {
    this.logger = this.baseLogger.withContext(MockRoomRepository.name);
  }

  async findAll(
    filters: RoomSearchFilters & PaginationFilter,
  ): Promise<PaginatedData<RoomEntity>> {
    this.logger.debug('findAll, filters: {0}', filters);

    const data = PaginatedDataMapper.toDomain(
      {
        limit: filters.limit,
        page: filters.page ?? 1,
        totalItems: ROOM_MOCK_DATA.length * 4,
      },
      () => ROOM_MOCK_DATA,
    );
    return DelayUtil.withRandomDelay(() => data);
  }

  async getRoomDetailsById(roomId: RoomId): Promise<RoomDetailsEntity> {
    this.logger.debug('findById, roomId: {0}', roomId);

    return DelayUtil.withRandomDelay(() => ROOM_DETAILS_MOCK_DATA);
  }

  async relocateResident(residentId: number, newRoomId: number): Promise<void> {
    this.logger.debug(
      'relocateResident, residentId: {0}, newRoomId: {1}',
      residentId,
      newRoomId,
    );
    await DelayUtil.withRandomDelay(() => {});
  }

  async getAvailableRoomsToRelocateResident(
    roomName: string,
    residentId: number,
  ): Promise<RoomEntity[]> {
    this.logger.debug(
      'getAvailableRoomsToRelocateResident, roomName: {0}, residentId: {1}',
      roomName,
      residentId,
    );
    return await DelayUtil.withRandomDelay(() => ROOM_MOCK_DATA.slice(0, 4));
  }

  async evictResident(residentId: number): Promise<void> {
    this.logger.debug('evictResident, residentId: {0}', residentId);
    await DelayUtil.withRandomDelay(() => {});
  }

  async addResident(roomId: RoomId, residentId: ResidentId): Promise<void> {
    this.logger.debug(
      'add resident, roomId: {0}, residentId: {1}',
      roomId,
      residentId,
    );
    await DelayUtil.withRandomDelay(() => {});
  }
}
