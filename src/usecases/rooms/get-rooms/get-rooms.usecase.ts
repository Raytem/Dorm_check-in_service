import { injectable, inject } from 'inversify';
import { PaginatedData } from '@domain/types';
import { RoomEntity } from '@domain/entities';
import { IRoomRepository } from '@domain/repositories';
import { RoomSearchFilters } from '@domain/types/room-search-filters.ts';
import { PaginationFilter } from '@domain/types/pagination-filter.ts';

@injectable()
export class GetRoomsUseCase {
	constructor(
		@inject(IRoomRepository.$)
		private readonly roomRepository: IRoomRepository,
	) {}

	async execute(filters: RoomSearchFilters & PaginationFilter): Promise<PaginatedData<RoomEntity>> {
		return await this.roomRepository.findAll(filters);
	}
}