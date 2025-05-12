import { inject, injectable } from 'inversify';
import { IRoomRepository } from '@domain/repositories';
import { ResidentId } from '@domain/entities';

@injectable()
export class EvictResidentUseCase {
  constructor(
    @inject(IRoomRepository.$)
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(residentId: ResidentId): Promise<void> {
    return await this.roomRepository.evictResident(residentId);
  }
}
