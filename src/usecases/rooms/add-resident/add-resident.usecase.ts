import { inject, injectable } from 'inversify';
import { IRoomRepository } from '@domain/repositories';
import { ResidentId, RoomId } from '@domain/entities';

@injectable()
export class AddResidentUseCase {
  constructor(
    @inject(IRoomRepository.$)
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(roomId: RoomId, residentId: ResidentId): Promise<void> {
    await this.roomRepository.addResident(roomId, residentId);
  }
}
