import { useCallback } from 'react';
import {
  BooleanParam,
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from 'use-query-params';
import { RoomSearchFilters } from '@domain/types/room-search-filters.ts';

export function useQueryRoomFilters(initialValue?: RoomSearchFilters) {
  const [query, setQuery] = useQueryParams({
    dormitoryNumber: withDefault(NumberParam, initialValue?.dormitoryNumber),
    floor: withDefault(NumberParam, initialValue?.floor),
    blockNumber: withDefault(NumberParam, initialValue?.blockNumber),
    roomName: withDefault(StringParam, initialValue?.roomName),
    blockType: withDefault(StringParam, initialValue?.blockType),
    studentGroup: withDefault(StringParam, initialValue?.studentGroup),
    onlyAvailableRooms: withDefault(
      BooleanParam,
      initialValue?.onlyAvailableRooms,
    ),
  });

  const setFilters = useCallback((filters: RoomSearchFilters) => {
    setQuery(filters);
  }, []);

  const resetFilters = useCallback(() => {
    const filters: RoomSearchFilters = {
      dormitoryNumber: undefined,
      floor: undefined,
      blockNumber: undefined,
      roomName: undefined,
      blockType: undefined,
      studentGroup: undefined,
      onlyAvailableRooms: undefined,
    };
    setFilters(filters);
  }, []);

  return {
    filters: {
      dormitoryNumber:
        query.dormitoryNumber as RoomSearchFilters['dormitoryNumber'],
      floor: query.floor as RoomSearchFilters['floor'],
      blockNumber: query.blockNumber as RoomSearchFilters['blockNumber'],
      roomName: query.roomName as RoomSearchFilters['roomName'],
      blockType: query.blockType as RoomSearchFilters['blockType'],
      studentGroup: query.studentGroup as RoomSearchFilters['studentGroup'],
      onlyAvailableRooms:
        query.onlyAvailableRooms as RoomSearchFilters['onlyAvailableRooms'],
    },
    setFilters,
    resetFilters,
  };
}
