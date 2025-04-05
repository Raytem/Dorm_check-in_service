import { Skeleton, SkeletonProps, Table, TableTrProps } from '@mantine/core';
import React from 'react';

export interface TableRowSkeletonProps extends TableTrProps {
  columnsCount?: number;
  skeletonsProps?: SkeletonProps[];
  animate?: boolean;
}

const TableRowSkeleton: React.FC<TableRowSkeletonProps> = ({
  columnsCount = 1,
  skeletonsProps = [],
  animate = true,
  ...props
}) => {
  return (
    <Table.Tr {...props}>
      {Array.from({ length: columnsCount }).map((_, idx) => {
        const skeletonProps =
          skeletonsProps.length < idx ? undefined : skeletonsProps[idx];

        return (
          <Table.Td key={idx}>
            <Skeleton animate={animate} {...skeletonProps}>
              Loading
            </Skeleton>
          </Table.Td>
        );
      })}
    </Table.Tr>
  );
};

export default TableRowSkeleton;
