import { ScrollArea, SkeletonProps, Table } from '@mantine/core';
import { RoomEntity } from '@domain/entities';
import TableRowSkeleton from '@components/shared/table-row-skeleton';
import RoomsTableRow from '@pages/rooms/components/rooms-table-row';
import TableThWithFilters from '@components/shared/table-th-with-filters';
import { RoomSortParams, SortDirection } from '@domain/enums';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@routing/app-routes.ts';

export interface RoomsTableProps {
	rooms: RoomEntity[];
	isLoading: boolean;
	skeletonRowsCount?: number;
	selectedSortBy?: any;
	sortDir?: SortDirection;
	onSortChange?: <S>(sortBy: S, sortDir: SortDirection) => void;
}

export interface RoomsTableHeaderProps {
	selectedSortBy?: any;
	sortDir?: SortDirection;
	onSortChange?: <S>(sortBy: S, sortDir: SortDirection) => void;
}


const columns: { key: RoomSortParams; label: string; skeletonProps: SkeletonProps }[] = [
	{ key: RoomSortParams.DORMITORY_NUMBER, label: 'Номер общежития', skeletonProps: { width: 20 } },
	{ key: RoomSortParams.FLOOR, label: 'Этаж', skeletonProps: { width: 20 } },
	{ key: RoomSortParams.BLOCK_NUMBER, label: 'Номер блока', skeletonProps: { width: 20 } },
	{ key: RoomSortParams.ROOM, label: 'Комната', skeletonProps: { width: 50 } },
	{ key: RoomSortParams.BLOCK_TYPE, label: 'Тип блока', skeletonProps: { width: 60 } },
	{ key: RoomSortParams.AVAILABLE_PLACES, label: 'Свободно мест', skeletonProps: { width: 20 } },
];

const RoomsTableHeader: React.FC<RoomsTableHeaderProps> = ({
  selectedSortBy,
  sortDir,
  onSortChange,
}) => (
	<Table.Thead>
		<Table.Tr>
			{columns.map(({ key, label }) => (
				<TableThWithFilters
					key={key}
					selectedSortBy={selectedSortBy}
					sortBy={key}
					sortDir={sortDir}
					onSortChange={onSortChange}
				>
					{label}
				</TableThWithFilters>
			))}
		</Table.Tr>
	</Table.Thead>
);

const RoomsTableSkeletonRows = ({ count }: { count: number }) => (
	<>
		{Array.from({ length: count }, (_, idx) => (
			<TableRowSkeleton key={idx} columnsCount={columns.length} skeletonsProps={columns.map((c) => c.skeletonProps)} />
		))}
	</>
);

const RoomsTableBody = ({ rooms, isLoading, skeletonRowsCount }: RoomsTableProps) => {
	const navigate = useNavigate();

	const handleRowClick = (roomId: number) => {
		const roomPath = AppRoutes.getPath(AppRoutes.ROOM, {
			roomId: String(roomId)
		});
		navigate(roomPath);
	}

	return <Table.Tbody>
		{isLoading
			? <RoomsTableSkeletonRows count={skeletonRowsCount ?? 20} />
			: rooms.map((room) => (
				<RoomsTableRow key={room.id} room={room} onClick={() => handleRowClick(room.id)} />
			))}
	</Table.Tbody>
};

const RoomsTable: React.FC<RoomsTableProps> = ({
	rooms,
	isLoading,
	skeletonRowsCount = 20,
	selectedSortBy,
	sortDir,
	onSortChange
}) => {
	return <ScrollArea>
		<Table horizontalSpacing="md" withRowBorders withTableBorder highlightOnHover>
			<RoomsTableHeader selectedSortBy={selectedSortBy} sortDir={sortDir} onSortChange={onSortChange} />
			<RoomsTableBody rooms={rooms} isLoading={isLoading} skeletonRowsCount={skeletonRowsCount} />
		</Table>
	</ScrollArea>
}

export default RoomsTable;