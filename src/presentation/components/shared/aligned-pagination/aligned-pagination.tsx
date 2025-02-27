import { Pagination, PaginationProps, Stack, StackProps } from '@mantine/core';
import React from 'react';


export interface AlignedPaginationProps  {
	container?: StackProps
	pagination: PaginationProps
}

const AlignedPagination: React.FC<AlignedPaginationProps> = ({
	container,
	pagination,
}) => {
	return <Stack align={'center'} {...container}>
		<Pagination
			siblings={2}
			hideWithOnePage
			{...pagination} />
	</Stack>
}

export default AlignedPagination;