import { BlockType } from '@domain/enums';

export type RoomId = number;

export class RoomEntity {
  constructor(
    public id: RoomId,
    public dormitoryNumber: number,
    public floor: number,
    public blockNumber: number,
    public roomName: string,
    public blockType: BlockType,
    public availablePlacesCount: number,
  ) {}
}
