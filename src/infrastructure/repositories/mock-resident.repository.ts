import { IResidentRepository } from '@domain/repositories';
import { GetCandidatesForRoomFilters, PaginatedData } from '@domain/types';
import { ResidentEntity } from '@domain/entities';
import { PaginatedDataMapper } from '@infrastructure/mappers';
import { RESIDENT_MOCK_DATA } from '@domain/mocks/resident.mock.ts';
import { DelayUtil } from '@presentation/utils';
import { inject, injectable } from 'inversify';
import { ILogger } from '@domain/logger/logger.interface.ts';

@injectable()
export class MockResidentRepository implements IResidentRepository {
  private logger: ILogger;

  constructor(
    @inject(ILogger.$)
    private readonly baseLogger: ILogger,
  ) {
    this.logger = this.baseLogger.withContext(MockResidentRepository.name);
  }

  getCandidatesForRoom(
    roomId: number,
    filters: GetCandidatesForRoomFilters,
  ): Promise<PaginatedData<ResidentEntity>> {
    this.logger.debug(
      `getCandidatesForRoom, roomId: ${roomId}, filters: ${filters}`,
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
}
