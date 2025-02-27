import { useCallback } from 'react';
import { BooleanParam, NumberParam, StringParam, useQueryParams, withDefault } from 'use-query-params';

import { RoomSearchFiltersEntity, SortParamsEntity } from '@domain/entities';
import { RoomSortParam } from '@domain/enums';

type ExtendedRoomFilters = RoomSearchFiltersEntity & SortParamsEntity<RoomSortParam>;

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
			dormitoryNumber: query.dormitoryNumber as RoomSearchFiltersEntity['dormitoryNumber'] ?? undefined,
			floor: query.floor as RoomSearchFiltersEntity['floor'] ?? undefined,
			blockNumber: query.blockNumber as RoomSearchFiltersEntity['blockNumber'] ?? undefined,
			roomName: query.roomName as RoomSearchFiltersEntity['roomName'] ?? undefined,
			blockType: query.blockType as RoomSearchFiltersEntity['blockType'] ?? undefined ,
			studentGroup: query.studentGroup as RoomSearchFiltersEntity['studentGroup'] ?? undefined,
			onlyAvailableRooms: query.onlyAvailableRooms as RoomSearchFiltersEntity['onlyAvailableRooms'] ?? undefined,
			// sort params
			sortBy: query.sortBy as SortParamsEntity<RoomSortParam>['sortBy'] ?? undefined,
			sortDir: query.sortDir as SortParamsEntity<RoomSortParam>['sortDir'] ?? undefined,
		},
		setFilters,
		resetFilters,
	}
}