import { useEffect } from 'react';
import { Divider, Stack } from '@mantine/core';
import { IconDoor } from '@tabler/icons-react';
import { useInjection } from 'inversify-react';

import PageLayout from '@layouts/page-layout';

import { useDocumentVisibility } from '@mantine/hooks';
import { useFetch, useQueryPagination, useQuerySort } from '@presentation/hooks';
import { useQueryRoomFilters } from '@pages/rooms/hooks';

import RoomsTable from './components/rooms-table';
import RoomsFilters from './components/rooms-filters';

import EmptyView from '@components/shared/empty-view';
import DataStatusContainer from '@components/shared/data-status-container';
import AlignedPagination from '@components/shared/aligned-pagination';

import { GetRoomsUseCase } from '@/usecases';
import { RoomSortParams, SortDirection } from '@domain/enums';


const RoomsPage = () => {
	const ROOMS_PER_PAGE = 20;

	const getRoomsUseCase = useInjection(GetRoomsUseCase)
	const documentVisibility = useDocumentVisibility();

	const {
		data,
		isLoading,
		error,
		refetch
	} = useFetch(async () => {
		return await getRoomsUseCase.execute(
			{ ...filters, ...sort, page, limit }
		)
	}, true)

	const onPageChange = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		refetch();
	}
	const onFiltersChange = () => {
		if (page === 1) {
			refetch();
		} else {
			setPage(1)
		}
	}
	const onSortChange = () => {
		refetch()
	}

	const {
		page,
		limit,
		setPage
	} = useQueryPagination(
		{
			page: 1,
			limit: ROOMS_PER_PAGE,
		},
		onPageChange,
	)

	const {
		filters,
		setFilters,
		resetFilters,
	} = useQueryRoomFilters(onFiltersChange)

	const {
		sort,
		setSort,
	} = useQuerySort<RoomSortParams>(
		onSortChange,
		{
			sortBy: RoomSortParams.DORMITORY_NUMBER,
			sortDir: SortDirection.ASC
		}
	)

	useEffect(() => {
		if (documentVisibility === 'hidden') return;
		refetch();
	}, [documentVisibility]);

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
						skeletonRowsCount={limit}
						sortDir={sort.sortDir!}
						selectedSortBy={sort.sortBy}
						onSortChange={(sortBy, sortDir) => {
							setSort(sortBy as RoomSortParams, sortDir)
						}}
					/>
				</DataStatusContainer>

				<AlignedPagination
					pagination={{
						value: page,
						total: data?.totalPages ?? 0,
						onChange: setPage
					}}
				/>
			</Stack>
		</Stack>
	</PageLayout>
}

export default RoomsPage;