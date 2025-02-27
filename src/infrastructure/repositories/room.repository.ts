import { injectable } from 'inversify';
import { PaginatedData } from '@domain/types';
import { PaginationFilterEntity, RoomDetailsEntity, RoomEntity, RoomSearchFiltersEntity } from '@domain/entities';
import { ROOM_MOCK_DATA } from '@domain/mocks';
import { ROOM_DETAILS_MOCK_DATA } from '@domain/mocks/room-details.mock.ts';
import { IRoomRepository } from '@domain/repositories';
import { PaginatedDataMapper } from '@infrastructure/mappers';


@injectable()
export class RoomRepository implements IRoomRepository {
	// constructor(
	// 	@inject(RoomService)
	// 	private readonly roomService: RoomService,
	// ) {}


	async findAll(filters: RoomSearchFiltersEntity & PaginationFilterEntity): Promise<PaginatedData<RoomEntity>> {
		console.log('RoomRepository.findAll filters: ', filters)

		const timeout = Math.ceil(Math.random() * 600 + 120);

		return await new Promise((resolve) => setTimeout(() => {
			const data = PaginatedDataMapper.toDomain({
				limit: filters.limit,
				page: filters.page ?? 1,
				totalItems: ROOM_MOCK_DATA.length * 4
			}, () => ROOM_MOCK_DATA)
			resolve(data)
		}, timeout))
	}

	async getRoomDetailsById(roomId: string): Promise<RoomDetailsEntity> {
		console.log('RoomRepository.findById: ', roomId);

		const timeout = Math.ceil(Math.random() * 1000 + 700);
		return await new Promise((resolve) => setTimeout(() => {
			resolve(ROOM_DETAILS_MOCK_DATA)
		}, timeout) )
	}
}