import { IRoomRepository } from '@domain/repositories';
import { RoomEntity } from '@domain/entities';
import { roomMocks } from '@domain/mocks';

import { injectable } from 'inversify';

@injectable()
export class RoomRepository implements IRoomRepository {
    async getAll(): Promise<RoomEntity[]> {
		return roomMocks
	}
}