import { RoomEntity } from '@domain/entities/room.entity.ts';
import { ResidentEntity } from '@domain/entities/resident.entity.ts';
import { BlockType } from '@domain/enums';

export class RoomDetailsEntity extends RoomEntity {
  constructor(
    id: number,
    dormitoryNumber: number,
    floor: number,
    blockNumber: number,
    room: string,
    blockType: BlockType,
    availablePlaces: number,
    public residents: ResidentEntity[],
  ) {
    super(
      id,
      dormitoryNumber,
      floor,
      blockNumber,
      room,
      blockType,
      availablePlaces,
    );
  }
}
