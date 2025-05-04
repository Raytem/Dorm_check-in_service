import { Sex } from '@domain/enums';

export type ResidentId = number;

export class ResidentEntity {
  constructor(
    public id: ResidentId,
    public firstName: string,
    public lastName: string,
    public patronymic: string,
    public avatarUrl: string | null,
    public gradeBookNumber: number,
    public groupName: string,
    public sex: Sex,
    public isCheckInConfirmed: boolean,
    public checkInDate: Date | null,
    public evictionDate: Date | null,
    public note: string,
  ) {}

  getFullName(): string {
    return `${this.lastName} ${this.firstName} ${this.patronymic}`;
  }
}
