import { GetCandidatesForRoomFilters, PaginatedData } from '@domain/types';
import { ResidentEntity } from '@domain/entities';
import { interfaces } from 'inversify';

export interface IResidentRepository {
  getCandidatesForRoom(
    roomId: number,
    filters: GetCandidatesForRoomFilters,
  ): Promise<PaginatedData<ResidentEntity>>;
}

export namespace IResidentRepository {
  export const $: interfaces.ServiceIdentifier<IResidentRepository> =
    Symbol('ResidentRepository');
}
