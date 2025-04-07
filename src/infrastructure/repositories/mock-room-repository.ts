import { injectable } from 'inversify';
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

@injectable()
export class MockRoomRepository implements IRoomRepository {
  async findAll(
    filters: RoomSearchFilters & PaginationFilter,
  ): Promise<PaginatedData<RoomEntity>> {
    console.debug('MockRoomRepository.findAll filters: ', filters);

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
    console.debug('MockRoomRepository.findById: ', roomId);

    return DelayUtil.withRandomDelay(() => ROOM_DETAILS_MOCK_DATA);
  }

  async relocateResident(residentId: number, newRoomId: number): Promise<void> {
    console.debug(
      `MockRoomRepository.relocateResident, residentId: ${residentId}, newRoomId: ${newRoomId}`,
    );
    await DelayUtil.withRandomDelay(() => {});
  }

  async getAvailableRoomsToRelocateResident(
    roomName: string,
    residentId: number,
  ): Promise<RoomEntity[]> {
    console.debug(
      `MockRoomRepository.getAvailableRoomsToRelocateResident, roomName: ${roomName}, residentId: ${residentId}`,
    );
    return await DelayUtil.withRandomDelay(() => ROOM_MOCK_DATA.slice(0, 4));
  }

  async evictResident(residentId: number): Promise<void> {
    console.debug(
      `MockRoomRepository.evictResident, residentId: ${residentId}`,
    );

    await DelayUtil.withRandomDelay(() => {});
  }

  async updateResidentInfo(
    residentId: number,
    data: Partial<Pick<ResidentEntity, 'isCheckInConfirmed' | 'note'>>,
  ): Promise<void> {
    console.debug(
      `MockRoomRepository.updateResidentInfo, residentId: ${residentId}, data: ${JSON.stringify(data, null, 2)}`,
    );

    await DelayUtil.withRandomDelay(() => {});
  }
}
