import { RoomEntity } from '@domain/entities';
import { interfaces } from 'inversify';

export interface IRoomRepository {
	getAll(): Promise<RoomEntity[]>
}
export namespace IRoomRepository {
	export const $: interfaces.ServiceIdentifier<IRoomRepository> = Symbol('IRoomRepository');
}