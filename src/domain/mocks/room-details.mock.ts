import { RoomDetailsEntity } from '@domain/entities';
import { BlockType } from '@domain/enums';
import { RESIDENT_MOCK_DATA } from '@domain/mocks/resident.mock.ts';

export const ROOM_DETAILS_MOCK_DATA: RoomDetailsEntity = new RoomDetailsEntity(
  1,
  1,
  2,
  1,
  '201м',
  BlockType.MALE,
  1,
  RESIDENT_MOCK_DATA.slice(0, 4),
);
