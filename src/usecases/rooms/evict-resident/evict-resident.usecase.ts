import { inject, injectable } from 'inversify';
import { IRoomRepository } from '@domain/repositories';

@injectable()
export class EvictResidentUseCase {
  constructor(
    @inject(IRoomRepository.$)
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(residentId: number): Promise<void> {
    return await this.roomRepository.evictResident(residentId);
  }
}
