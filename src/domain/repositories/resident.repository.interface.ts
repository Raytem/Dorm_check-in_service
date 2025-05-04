import {
  GetCandidatesForRoomFilters,
  PaginatedData,
  PaginationFilter,
} from '@domain/types';
import { ResidentEntity, ResidentId, RoomId } from '@domain/entities';
import { interfaces } from 'inversify';

export interface IResidentRepository {
  getCandidatesForRoom(
    roomId: RoomId,
    filters: GetCandidatesForRoomFilters & PaginationFilter,
  ): Promise<PaginatedData<ResidentEntity>>;

  updateResidentInfo(
    residentId: ResidentId,
    data: Partial<Pick<ResidentEntity, 'isCheckInConfirmed' | 'note'>>,
  ): Promise<void>;
}

export namespace IResidentRepository {
  export const $: interfaces.ServiceIdentifier<IResidentRepository> =
    Symbol('ResidentRepository');
}
