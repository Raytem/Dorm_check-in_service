import { useCallback } from 'react';
import { BooleanParam, NumberParam, StringParam, useQueryParams, withDefault } from 'use-query-params';
import { RoomSortParams } from '@domain/enums';
import { SortParams } from '@domain/types/sort-params.ts';
import { RoomSearchFilters } from '@domain/types/room-search-filters.ts';

type ExtendedRoomFilters = RoomSearchFilters & SortParams<RoomSortParams>;

export function useRoomFilters(initialValue?: ExtendedRoomFilters) {
	const [query, setQuery] = useQueryParams({
		dormitoryNumber: withDefault(NumberParam, initialValue?.dormitoryNumber),
		floor: withDefault(NumberParam, initialValue?.floor),
		blockNumber: withDefault(NumberParam, initialValue?.blockNumber),
		roomName: withDefault(StringParam, initialValue?.roomName),
		blockType: withDefault(StringParam, initialValue?.blockType),
		studentGroup: withDefault(StringParam, initialValue?.studentGroup),
		onlyAvailableRooms: withDefault(BooleanParam, initialValue?.onlyAvailableRooms),
		// sort params
		sortBy: withDefault(StringParam, initialValue?.sortBy),
		sortDir: withDefault(StringParam, initialValue?.sortDir),
	})

	const setFilters = useCallback((filters: ExtendedRoomFilters) => {
		setQuery(filters)
	}, [])

	const resetFilters = useCallback(() => {
		setFilters({
			dormitoryNumber: undefined,
			floor: undefined,
			blockNumber: undefined,
			roomName: undefined,
			blockType: undefined,
			studentGroup: undefined,
			onlyAvailableRooms: undefined,
		})
	}, [])

	return {
		filters: {
			dormitoryNumber: query.dormitoryNumber as RoomSearchFilters['dormitoryNumber'],
			floor: query.floor as RoomSearchFilters['floor'],
			blockNumber: query.blockNumber as RoomSearchFilters['blockNumber'],
			roomName: query.roomName as RoomSearchFilters['roomName'],
			blockType: query.blockType as RoomSearchFilters['blockType'] ,
			studentGroup: query.studentGroup as RoomSearchFilters['studentGroup'],
			onlyAvailableRooms: query.onlyAvailableRooms as RoomSearchFilters['onlyAvailableRooms'],
			// sort params
			sortBy: query.sortBy as SortParams<RoomSortParams>['sortBy'],
			sortDir: query.sortDir as SortParams<RoomSortParams>['sortDir'],
		},
		setFilters,
		resetFilters,
	}
}