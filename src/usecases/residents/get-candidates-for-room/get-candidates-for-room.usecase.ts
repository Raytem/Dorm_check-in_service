import { ResidentEntity, RoomId } from '@domain/entities';
import {
  GetCandidatesForRoomFilters,
  PaginatedData,
  PaginationFilter,
} from '@domain/types';
import { inject, injectable } from 'inversify';
import { IResidentRepository } from '@domain/repositories';

@injectable()
export class GetCandidatesForRoomUseCase {
  constructor(
    @inject(IResidentRepository.$)
    private readonly residentRepository: IResidentRepository,
  ) {}

  async execute(
    roomId: RoomId,
    filters: GetCandidatesForRoomFilters & PaginationFilter,
  ): Promise<PaginatedData<ResidentEntity>> {
    return await this.residentRepository.getCandidatesForRoom(roomId, filters);
  }
}
