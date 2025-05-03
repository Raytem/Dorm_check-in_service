import { SkeletonProps, Table, TableProps } from '@mantine/core';
import { ResidentEntity } from '@domain/entities';
import TableRowSkeleton from '@components/shared/table-row-skeleton';
import React, { forwardRef } from 'react';
import ResidentsTableRow from '@components/room/modals/add-resident/residents-table/residents-table-row.tsx';

export interface ResidentsTableProps extends TableProps {
  residents: ResidentEntity[];
  selectedResident?: ResidentEntity | null;
  isLoading: boolean;
  onRowClick: (resident: ResidentEntity) => void;
  skeletonRowsCount?: number;
}

interface ResidentsTableColumnData {
  label: string;
  skeletonProps: SkeletonProps;
}

const columns: ResidentsTableColumnData[] = [
  {
    label: 'Фото',
    skeletonProps: { circle: true, w: 40, h: 40 },
  },
  {
    label: 'Фамилия',
    skeletonProps: { w: 70 },
  },
  { label: 'Имя', skeletonProps: { w: 60 } },
  {
    label: 'Отчество',
    skeletonProps: { w: 80 },
  },
  { label: 'Пол', skeletonProps: { w: 60 } },
  {
    label: 'Номер зачетки',
    skeletonProps: { w: 70 },
  },
  {
    label: 'Группа',
    skeletonProps: { w: 40 },
  },
  {
    label: 'Статус заселения',
    skeletonProps: { w: 150 },
  },
  {
    label: 'Дата заселения',
    skeletonProps: { w: 70 },
  },
];

const ResidentsTableHeader: React.FC = () => (
  <Table.Thead>
    <Table.Tr>
      {columns.map(({ label }, idx) => (
        <Table.Th key={`${label}-${idx}`}>{label}</Table.Th>
      ))}
    </Table.Tr>
  </Table.Thead>
);

const ResidentsTableSkeletonRows = ({ count }: { count: number }) => (
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

const ResidentsTableBody = ({
  residents,
  selectedResident,
  isLoading,
  onRowClick,
  skeletonRowsCount,
}: ResidentsTableProps) => {
  return (
    <Table.Tbody>
      {isLoading ? (
        <ResidentsTableSkeletonRows count={skeletonRowsCount ?? 20} />
      ) : (
        residents.map((resident) => (
          <ResidentsTableRow
            key={resident.id}
            resident={resident}
            isSelected={resident.id === selectedResident?.id}
            onClick={() => onRowClick(resident)}
          />
        ))
      )}
    </Table.Tbody>
  );
};

// eslint-disable-next-line react/display-name
const RoomsTable = forwardRef<HTMLTableElement, ResidentsTableProps>(
  (
    {
      residents,
      isLoading,
      onRowClick,
      selectedResident = null,
      skeletonRowsCount = 20,
    },
    ref,
    ...props
  ) => {
    return (
      <div style={{ overflowX: 'scroll' }}>
        <Table
          ref={ref}
          horizontalSpacing="md"
          withRowBorders
          withTableBorder
          highlightOnHover={!isLoading}
          {...props}
        >
          <ResidentsTableHeader />
          <ResidentsTableBody
            onRowClick={onRowClick}
            selectedResident={selectedResident}
            residents={residents}
            isLoading={isLoading}
            skeletonRowsCount={skeletonRowsCount}
          />
        </Table>
      </div>
    );
  },
);

export default RoomsTable;
