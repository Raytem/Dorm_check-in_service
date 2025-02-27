import { injectable } from 'inversify';
import { PaginatedData } from '@domain/types';
import { PaginationFilterEntity, RoomEntity, RoomSearchFiltersEntity } from '@domain/entities';
import { ROOM_MOCK_DATA } from '@domain/mocks';
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

	// async findById(id: string): Promise<RoomEntity> {
	// 	const timeout = Math.ceil(Math.random() * 600 + 120);
	// 	return await new Promise((resolve) => setTimeout(() => {
	// 		resolve(ROOM_MOCK_DATA[0]!)
	// 	}, timeout) )
	// }
}