import { useEffect } from 'react';
import { Divider, Stack } from '@mantine/core';
import { IconDoor } from '@tabler/icons-react';
import { useInjection } from 'inversify-react';

import PageLayout from '@layouts/page-layout';

import { useDocumentVisibility } from '@mantine/hooks';
import { useFetch, usePaginationFilter, useRoomFilters } from '@presentation/hooks';

import RoomsTable from './components/rooms-table';
import RoomsFilters from './components/rooms-filters';

import EmptyView from '@components/shared/empty-view';
import DataStatusContainer from '@components/shared/data-status-container';
import AlignedPagination from '@components/shared/aligned-pagination';

import { GetRoomsUseCase } from '@/usecases';
import { RoomSortParams, SortDirection } from '@domain/enums';


const RoomsPage = () => {
	const rowsCount = 20;
	const getRoomsUseCase = useInjection(GetRoomsUseCase)
	const documentVisibility = useDocumentVisibility();

	const { page, limit, setPage } = usePaginationFilter({
		page: 1,
		limit: rowsCount,
	})

	const {
		filters,
		setFilters,
		resetFilters,
	} = useRoomFilters({ sortBy: RoomSortParams.DORMITORY_NUMBER, sortDir: SortDirection.ASC })

	const { data, isLoading, error, refetch } = useFetch(async () => {
		return await getRoomsUseCase.execute({ ...filters, page, limit })
	}, true)

	useEffect(() => {
		if (page === 1) {
			refetch();
		} else {
			setPage(1);
		}
	}, [filters.blockType, filters.roomName, filters.onlyAvailableRooms, filters.blockNumber, filters.dormitoryNumber, filters.studentGroup, filters.floor]);

	useEffect(() => {
		if (documentVisibility === 'visible') {
			refetch();
		}
	}, [documentVisibility, page, limit, filters.sortBy, filters.sortDir, refetch]);

	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, [])


	return <PageLayout
		title={'Комнаты общежитий'}
	>
		<Stack gap={'xl'}>
			<RoomsFilters
				filters={filters}
				setFilters={setFilters}
				resetFilters={resetFilters}
			/>

			<Divider/>

			<Stack>
				<DataStatusContainer
					skipLoadingState
					isLoading={isLoading}
					error={error}
					dataLength={data?.data.length ?? 0}
					EmptyComponent={<EmptyView icon={<IconDoor size={''}/>} title={'Комнаты не найдены'} description={'Попробуйте изменить параметры фильтра'} />}
				>
					<RoomsTable
						rooms={data?.data ?? []}
						isLoading={isLoading}
						skeletonRowsCount={rowsCount}
						sortDir={filters.sortDir!}
						selectedSortBy={filters.sortBy}
						onSortChange={(sortBy, sortDir) => {
							setFilters({ sortBy: sortBy as RoomSortParams, sortDir })
						}}
					/>
				</DataStatusContainer>

				<AlignedPagination pagination={{ value: page, total: data?.totalPages ?? 0, onChange: setPage }} />
			</Stack>
		</Stack>
	</PageLayout>
}

export default RoomsPage;