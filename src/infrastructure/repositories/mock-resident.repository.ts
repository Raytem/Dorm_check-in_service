import { IResidentRepository } from '@domain/repositories';
import {
  GetCandidatesForRoomFilters,
  PaginatedData,
  PaginationFilter,
} from '@domain/types';
import { ResidentEntity, ResidentId, RoomId } from '@domain/entities';
import { PaginatedDataMapper } from '@infrastructure/mappers';
import { RESIDENT_MOCK_DATA } from '@domain/mocks/resident.mock.ts';
import { DelayUtil } from 'infrastructure/utils';
import { inject, injectable } from 'inversify';
import { ILogger } from '@domain/logger/logger.interface.ts';

@injectable()
export class MockResidentRepository implements IResidentRepository {
  constructor(
    @inject(ILogger.$)
    private readonly logger: ILogger,
  ) {
    this.logger.setContext(MockResidentRepository.name);
  }

  getCandidatesForRoom(
    roomId: RoomId,
    filters: GetCandidatesForRoomFilters & PaginationFilter,
  ): Promise<PaginatedData<ResidentEntity>> {
    this.logger.debug(
      'getCandidatesForRoom, roomId: {0}, filters: {1}',
      roomId,
      filters,
    );

    const data = PaginatedDataMapper.toDomain(
      {
        limit: filters.limit,
        page: filters.page ?? 1,
        totalItems: RESIDENT_MOCK_DATA.length * 4,
      },
      () => RESIDENT_MOCK_DATA,
    );
    return DelayUtil.withRandomDelay(() => data);
  }

  async updateResidentInfo(
    residentId: ResidentId,
    data: Partial<Pick<ResidentEntity, 'isCheckInConfirmed' | 'note'>>,
  ): Promise<void> {
    this.logger.debug(
      'updateResidentInfo, residentId: {0}, data: {1}',
      residentId,
      data,
    );

    await DelayUtil.withRandomDelay(() => {});
  }
}
