import { interfaces } from 'inversify';
import { RoomEntity, RoomDetailsEntity } from '@domain/entities';
import { PaginatedData, PaginationFilter } from '@domain/types';
import { RoomSearchFilters } from '@domain/types/room-search-filters.ts';

export interface IRoomRepository {
	findAll(filters: RoomSearchFilters & PaginationFilter): Promise<PaginatedData<RoomEntity>>;

	getRoomDetailsById(roomId: number): Promise<RoomDetailsEntity>;
}

export namespace IRoomRepository {
	export const $: interfaces.ServiceIdentifier<IRoomRepository> = Symbol('IRoomRepository');
}