import { inject, injectable } from 'inversify';
import { IRoomRepository } from '@domain/repositories';

@injectable()
export class RelocateResidentUseCase {
  constructor(
    @inject(IRoomRepository.$)
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(residentId: number, newRoomId: number): Promise<void> {
    return await this.roomRepository.relocateResident(residentId, newRoomId);
  }
}
