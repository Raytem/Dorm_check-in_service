import { inject, injectable } from 'inversify';
import { IRoomRepository } from '@domain/repositories';
import { ResidentId, RoomEntity } from '@domain/entities';

@injectable()
export class GetAvailableRoomsToRelocateResidentUseCase {
  constructor(
    @inject(IRoomRepository.$)
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(
    roomName: string,
    residentId: ResidentId,
  ): Promise<RoomEntity[]> {
    return await this.roomRepository.getAvailableRoomsToRelocateResident(
      roomName,
      residentId,
    );
  }
}
