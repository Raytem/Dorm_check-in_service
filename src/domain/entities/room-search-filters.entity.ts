import { BlockType } from '@domain/enums';

export class RoomSearchFiltersEntity {
	constructor(
		public dormitoryNumber?: number,
		public floor?: number,
		public blockNumber?: number,
		public roomName?: string,
		public blockType?: BlockType,
		public studentGroup?: string,
		public onlyAvailableRooms?: boolean,
	) {
	}
}