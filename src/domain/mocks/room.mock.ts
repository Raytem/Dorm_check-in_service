import { RoomEntity } from '@domain/entities';
import { BlockType } from '@domain/enums';

export const ROOM_MOCK_DATA = [
  new RoomEntity(1, 1, 2, 1, '201м', BlockType.MALE, 1),
  new RoomEntity(2, 1, 2, 2, '202б', BlockType.FEMALE, 2),
  new RoomEntity(3, 1, 3, 1, '301м', BlockType.MALE, 3),
  new RoomEntity(4, 2, 1, 3, '101б', BlockType.FEMALE, 0),
  new RoomEntity(5, 2, 4, 1, '401м', BlockType.MALE, 4),
  new RoomEntity(6, 2, 5, 2, '501б', BlockType.FEMALE, 2),
  new RoomEntity(7, 3, 3, 1, '302м', BlockType.MALE, 0),
  new RoomEntity(8, 3, 4, 2, '402б', BlockType.FEMALE, 1),
  new RoomEntity(9, 4, 2, 3, '203м', BlockType.MALE, 3),
  new RoomEntity(10, 4, 3, 1, '303б', BlockType.FEMALE, 4),
  new RoomEntity(11, 5, 4, 2, '403м', BlockType.MALE, 1),
  new RoomEntity(12, 5, 5, 3, '503б', BlockType.FEMALE, 0),
  new RoomEntity(13, 6, 2, 2, '204м', BlockType.MALE, 2),
  new RoomEntity(14, 6, 3, 1, '304б', BlockType.FEMALE, 3),
  new RoomEntity(15, 7, 4, 2, '404м', BlockType.MALE, 0),
  new RoomEntity(16, 7, 5, 1, '504б', BlockType.FEMALE, 1),
  new RoomEntity(17, 8, 1, 3, '101м', BlockType.MALE, 2),
  new RoomEntity(18, 8, 2, 2, '201б', BlockType.FEMALE, 4),
  new RoomEntity(19, 9, 3, 1, '301м', BlockType.MALE, 1),
  new RoomEntity(20, 9, 4, 2, '401б', BlockType.FEMALE, 0),
];
