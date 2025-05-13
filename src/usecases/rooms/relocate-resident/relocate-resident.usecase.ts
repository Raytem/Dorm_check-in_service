import { inject, injectable } from 'inversify';
import { IRoomRepository } from '@domain/repositories';
import { ResidentId } from '@domain/entities';

@injectable()
export class RelocateResidentUseCase {
  constructor(
    @inject(IRoomRepository.$)
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(residentId: ResidentId, newRoomId: number): Promise<void> {
    return await this.roomRepository.relocateResident(residentId, newRoomId);
  }
}
