import { inject, injectable } from 'inversify';
import { IRoomRepository } from '@domain/repositories';
import { RoomDetailsEntity } from '@domain/entities';

@injectable()
export class GetRoomDetailsUseCase {
  constructor(
    @inject(IRoomRepository.$)
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(roomId: number): Promise<RoomDetailsEntity> {
    return await this.roomRepository.getRoomDetailsById(roomId);
  }
}
