import { interfaces } from 'inversify';
import { PaginationFilterEntity, RoomSearchFiltersEntity, RoomEntity, RoomDetailsEntity } from '@domain/entities';
import { PaginatedData } from '@domain/types';

export interface IRoomRepository {
	findAll(filters: RoomSearchFiltersEntity & PaginationFilterEntity): Promise<PaginatedData<RoomEntity>>;

	getRoomDetailsById(roomId: string): Promise<RoomDetailsEntity>;
}

export namespace IRoomRepository {
	export const $: interfaces.ServiceIdentifier<IRoomRepository> = Symbol('IRoomRepository');
}