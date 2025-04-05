import { BlockType } from '@domain/enums';

export class RoomEntity {
  constructor(
    public id: number,
    public dormitoryNumber: number,
    public floor: number,
    public blockNumber: number,
    public roomName: string,
    public blockType: BlockType,
    public availablePlacesCount: number,
  ) {}
}
