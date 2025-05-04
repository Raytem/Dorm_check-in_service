import { interfaces } from 'inversify';
import {
  RoomEntity,
  RoomDetailsEntity,
  RoomId,
  ResidentId,
} from '@domain/entities';
import { PaginatedData, PaginationFilter } from '@domain/types';
import { RoomSearchFilters } from '@domain/types/room-search-filters.ts';

export interface IRoomRepository {
  findAll(
    filters: RoomSearchFilters & PaginationFilter,
  ): Promise<PaginatedData<RoomEntity>>;

  getRoomDetailsById(roomId: RoomId): Promise<RoomDetailsEntity>;

  relocateResident(residentId: ResidentId, newRoomId: RoomId): Promise<void>;

  getAvailableRoomsToRelocateResident(
    roomName: string,
    residentId: number,
  ): Promise<RoomEntity[]>;

  evictResident(residentId: ResidentId): Promise<void>;

  addResident(roomId: RoomId, residentId: ResidentId): Promise<void>;
}

export namespace IRoomRepository {
  export const $: interfaces.ServiceIdentifier<IRoomRepository> =
    Symbol('RoomRepository');
}
