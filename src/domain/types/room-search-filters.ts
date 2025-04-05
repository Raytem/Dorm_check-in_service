import { BlockType } from '@domain/enums';

export interface RoomSearchFilters {
  dormitoryNumber?: number;
  floor?: number;
  blockNumber?: number;
  roomName?: string;
  blockType?: BlockType;
  studentGroup?: string;
  onlyAvailableRooms?: boolean;
}
