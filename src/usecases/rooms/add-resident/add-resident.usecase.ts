import { inject, injectable } from 'inversify';
import { IRoomRepository } from '@domain/repositories';

@injectable()
export class AddResidentUseCase {
  constructor(
    @inject(IRoomRepository.$)
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(roomId: number, residentId: number): Promise<void> {
    await this.roomRepository.addResident(roomId, residentId);
  }
}
