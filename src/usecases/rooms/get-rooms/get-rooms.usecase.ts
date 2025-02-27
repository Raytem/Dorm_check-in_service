import { injectable, inject } from 'inversify';
import { PaginatedData } from '@domain/types';
import { PaginationFilterEntity, RoomEntity } from '@domain/entities';
import { RoomSearchFiltersEntity } from '@domain/entities/room-search-filters.entity.ts';
import { IRoomRepository } from '@domain/repositories';

@injectable()
export class GetRoomsUseCase {
	constructor(
		@inject(IRoomRepository.$)
		private readonly roomRepository: IRoomRepository,
	) {}

	async execute(filters: RoomSearchFiltersEntity & PaginationFilterEntity): Promise<PaginatedData<RoomEntity>> {
		return await this.roomRepository.findAll(filters);
	}
}