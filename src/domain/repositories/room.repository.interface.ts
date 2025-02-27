import { interfaces } from 'inversify';
import { PaginationFilterEntity, RoomSearchFiltersEntity, RoomEntity } from '@domain/entities';
import { PaginatedData } from '@domain/types';

export interface IRoomRepository {
	findAll(filters: RoomSearchFiltersEntity & PaginationFilterEntity): Promise<PaginatedData<RoomEntity>>
}

export namespace IRoomRepository {
	export const $: interfaces.ServiceIdentifier<IRoomRepository> = Symbol('IRoomRepository');
}