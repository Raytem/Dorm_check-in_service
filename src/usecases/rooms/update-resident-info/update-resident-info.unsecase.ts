import { inject, injectable } from 'inversify';
import { IRoomRepository } from '@domain/repositories';
import { ResidentEntity } from '@domain/entities';

@injectable()
export class UpdateResidentInfoUseCase {
  constructor(
    @inject(IRoomRepository.$)
    private readonly roomRepository: IRoomRepository,
  ) {}

  async execute(
    residentId: number,
    data: Partial<Pick<ResidentEntity, 'isCheckInConfirmed' | 'note'>>,
  ): Promise<void> {
    await this.roomRepository.updateResidentInfo(residentId, data);
  }
}
