import { Sex } from '@domain/enums';

export class ResidentEntity {
	constructor(
		public id: number,
		public firstName: string,
		public lastName: string,
		public patronymic: string,
		public avatarUrl: string | null,
		public gradeBookNumber: number,
		public groupName: string,
		public sex: Sex,
		public isCheckInConfirmed: boolean,
		public checkInDate: Date,
		public evictionDate: Date | null,
		public note: string,
	) {}
}