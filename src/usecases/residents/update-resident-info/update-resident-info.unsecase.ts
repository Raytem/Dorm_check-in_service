import { inject, injectable } from 'inversify';
import { IResidentRepository } from '@domain/repositories';
import { ResidentEntity, ResidentId } from '@domain/entities';

@injectable()
export class UpdateResidentInfoUseCase {
  constructor(
    @inject(IResidentRepository.$)
    private readonly residentRepository: IResidentRepository,
  ) {}

  async execute(
    residentId: ResidentId,
    data: Partial<Pick<ResidentEntity, 'isCheckInConfirmed' | 'note'>>,
  ): Promise<void> {
    await this.residentRepository.updateResidentInfo(residentId, data);
  }
}
