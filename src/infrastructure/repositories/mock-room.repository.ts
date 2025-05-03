import { inject, injectable } from 'inversify';
import {
  PaginatedData,
  PaginationFilter,
  RoomSearchFilters,
} from '@domain/types';
import {
  ResidentEntity,
  RoomDetailsEntity,
  RoomEntity,
} from '@domain/entities';
import { ROOM_MOCK_DATA } from '@domain/mocks';
import { ROOM_DETAILS_MOCK_DATA } from '@domain/mocks/room-details.mock.ts';
import { IRoomRepository } from '@domain/repositories';
import { PaginatedDataMapper } from '@infrastructure/mappers';
import { DelayUtil } from '@presentation/utils';
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
    this.logger.debug('findAll, filters:', filters);

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

  async getRoomDetailsById(roomId: number): Promise<RoomDetailsEntity> {
    this.logger.debug('findById, roomId:', roomId);

    return DelayUtil.withRandomDelay(() => ROOM_DETAILS_MOCK_DATA);
  }

  async relocateResident(residentId: number, newRoomId: number): Promise<void> {
    this.logger.debug(
      `relocateResident, residentId: ${residentId}, newRoomId: ${newRoomId}`,
    );
    await DelayUtil.withRandomDelay(() => {});
  }

  async getAvailableRoomsToRelocateResident(
    roomName: string,
    residentId: number,
  ): Promise<RoomEntity[]> {
    this.logger.debug(
      `getAvailableRoomsToRelocateResident, roomName: ${roomName}, residentId: ${residentId}`,
    );
    return await DelayUtil.withRandomDelay(() => ROOM_MOCK_DATA.slice(0, 4));
  }

  async evictResident(residentId: number): Promise<void> {
    this.logger.debug('evictResident, residentId: ', residentId);
    await DelayUtil.withRandomDelay(() => {});
  }

  async updateResidentInfo(
    residentId: number,
    data: Partial<Pick<ResidentEntity, 'isCheckInConfirmed' | 'note'>>,
  ): Promise<void> {
    this.logger.debug(
      `updateResidentInfo, residentId: ${residentId}, data: ${JSON.stringify(data, null, 2)}`,
    );

    await DelayUtil.withRandomDelay(() => {});
  }
}
