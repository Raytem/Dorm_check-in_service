import { interfaces } from 'inversify';
import {
  RoomEntity,
  RoomDetailsEntity,
  ResidentEntity,
} from '@domain/entities';
import { PaginatedData, PaginationFilter } from '@domain/types';
import { RoomSearchFilters } from '@domain/types/room-search-filters.ts';

export interface IRoomRepository {
  findAll(
    filters: RoomSearchFilters & PaginationFilter,
  ): Promise<PaginatedData<RoomEntity>>;

  getRoomDetailsById(roomId: number): Promise<RoomDetailsEntity>;

  relocateResident(residentId: number, newRoomId: number): Promise<void>;

  getAvailableRoomsToRelocateResident(
    roomName: string,
    residentId: number,
  ): Promise<RoomEntity[]>;

  evictResident(residentId: number): Promise<void>;

  updateResidentInfo(
    residentId: number,
    data: Partial<Pick<ResidentEntity, 'isCheckInConfirmed' | 'note'>>,
  ): Promise<void>;
}

export namespace IRoomRepository {
  export const $: interfaces.ServiceIdentifier<IRoomRepository> =
    Symbol('RoomRepository');
}
