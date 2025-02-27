import { Group, Stack, Table, TableThProps } from '@mantine/core';
import { SortDirection } from '@domain/enums';
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-react';
import React from 'react';

export interface TableThWithFiltersProps extends TableThProps {
	selectedSortBy?: string;
	sortBy: any;
	sortDir?: SortDirection;
	onSortChange?: <S extends string>(sortBy: S, sortDir: SortDirection) => void;
}

const TableThWithFilters: React.FC<TableThWithFiltersProps> = ({
   selectedSortBy,
   sortBy,
   sortDir,
   onSortChange = () => {},
   children,
   ...props
}) => {
	const handleHeaderClick = () => {
		const newSortDir = sortDir ? SortDirection.getChangedDirection(sortDir) : SortDirection.ASC;
		onSortChange(sortBy, newSortDir);
	};

	return (
		<Table.Th {...props} onClick={handleHeaderClick} style={{ cursor: 'pointer' }}>
			<Group wrap="nowrap" gap="sm">
				{children}

				<Stack maw={14} miw={14} gap={0}>
					{selectedSortBy === sortBy ? (
						sortDir === SortDirection.ASC ? <IconChevronUp /> : <IconChevronDown />
					) : (
						<IconSelector />
					)}
				</Stack>
			</Group>
		</Table.Th>
	);
}

export default TableThWithFilters;