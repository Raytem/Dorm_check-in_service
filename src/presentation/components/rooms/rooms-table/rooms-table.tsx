import { SkeletonProps, Table } from '@mantine/core';
import { RoomEntity } from '@domain/entities';
import TableRowSkeleton from '@components/shared/table-row-skeleton';
import TableThWithFilters from '@components/shared/table-th-with-filters';
import { RoomSortParams, SortDirection } from '@domain/enums';
import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@routing/app-routes.ts';
import RoomsTableRow from '@components/rooms/rooms-table/rooms-table-row.tsx';

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

interface RoomsTableColumnData {
  key: RoomSortParams;
  label: string;
  skeletonProps: SkeletonProps;
}

const columns: RoomsTableColumnData[] = [
  {
    key: RoomSortParams.DORMITORY_NUMBER,
    label: 'Номер общежития',
    skeletonProps: { width: 20 },
  },
  { key: RoomSortParams.FLOOR, label: 'Этаж', skeletonProps: { width: 20 } },
  {
    key: RoomSortParams.BLOCK_NUMBER,
    label: 'Номер блока',
    skeletonProps: { width: 20 },
  },
  { key: RoomSortParams.ROOM, label: 'Комната', skeletonProps: { width: 50 } },
  {
    key: RoomSortParams.BLOCK_TYPE,
    label: 'Тип блока',
    skeletonProps: { width: 60 },
  },
  {
    key: RoomSortParams.AVAILABLE_PLACES,
    label: 'Свободно мест',
    skeletonProps: { width: 20 },
  },
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
      <TableRowSkeleton
        key={idx}
        columnsCount={columns.length}
        skeletonsProps={columns.map((c) => c.skeletonProps)}
      />
    ))}
  </>
);

const RoomsTableBody = ({
  rooms,
  isLoading,
  skeletonRowsCount,
}: RoomsTableProps) => {
  const navigate = useNavigate();

  const handleRowClick = (roomId: number) => {
    const roomPath = AppRoutes.getPath(AppRoutes.ROOM, {
      roomId: String(roomId),
    });
    navigate(roomPath);
  };

  return (
    <Table.Tbody>
      {isLoading ? (
        <RoomsTableSkeletonRows count={skeletonRowsCount ?? 20} />
      ) : (
        rooms.map((room) => (
          <RoomsTableRow
            key={room.id}
            room={room}
            onClick={() => handleRowClick(room.id)}
          />
        ))
      )}
    </Table.Tbody>
  );
};

// eslint-disable-next-line react/display-name
const RoomsTable = forwardRef<HTMLTableElement, RoomsTableProps>(
  (
    {
      rooms,
      isLoading,
      skeletonRowsCount = 20,
      selectedSortBy,
      sortDir,
      onSortChange,
    },
    ref,
  ) => {
    return (
      <div style={{ overflowX: 'scroll' }}>
        <Table
          ref={ref}
          horizontalSpacing="md"
          withRowBorders
          withTableBorder
          highlightOnHover={!isLoading}
        >
          <RoomsTableHeader
            selectedSortBy={selectedSortBy}
            sortDir={sortDir}
            onSortChange={onSortChange}
          />
          <RoomsTableBody
            rooms={rooms}
            isLoading={isLoading}
            skeletonRowsCount={skeletonRowsCount}
          />
        </Table>
      </div>
    );
  },
);

export default RoomsTable;
