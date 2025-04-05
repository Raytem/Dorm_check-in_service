import { useEffect, useRef } from 'react';
import { Divider, Stack } from '@mantine/core';
import { IconDoor } from '@tabler/icons-react';
import { useInjection } from 'inversify-react';

import PageLayout from 'presentation/layouts/page';

import { useDocumentVisibility } from '@mantine/hooks';
import { useFetch, useQueryPagination, useQuerySort } from '@hooks/shared';

import RoomsTable from '../../components/rooms/rooms-table';
import RoomsFilters from '../../components/rooms/rooms-filters';

import EmptyView from '@components/shared/empty-view';
import DataStatusContainer from '@components/shared/data-status-container';
import AlignedPagination from '@components/shared/aligned-pagination';

import { GetRoomsUseCase } from '@/usecases';
import { RoomSortParams, SortDirection } from '@domain/enums';
import { useQueryRoomFilters } from '@hooks/rooms';

const RoomsPage = () => {
  const ROOMS_PER_PAGE = 20;

  const getRoomsUseCase = useInjection(GetRoomsUseCase);
  const documentVisibility = useDocumentVisibility();

  const { data, isLoading, error, refetch } = useFetch(async () => {
    return await getRoomsUseCase.execute({ ...filters, ...sort, page, limit });
  }, true);

  const { page, limit, setPage } = useQueryPagination({
    page: 1,
    limit: ROOMS_PER_PAGE,
  });

  const { filters, setFilters, resetFilters } = useQueryRoomFilters();

  const { sort, setSort } = useQuerySort<RoomSortParams>({
    sortBy: RoomSortParams.DORMITORY_NUMBER,
    sortDir: SortDirection.ASC,
  });

  useEffect(() => {
    refetch();
  }, [
    filters.blockType,
    filters.roomName,
    filters.onlyAvailableRooms,
    filters.blockNumber,
    filters.dormitoryNumber,
    filters.studentGroup,
    filters.floor,
    page,
    limit,
    sort.sortBy,
    sort.sortDir,
  ]);

  const wasHidden = useRef(false);

  useEffect(() => {
    if (documentVisibility === 'hidden') {
      wasHidden.current = true;
    }

    if (documentVisibility === 'visible' && wasHidden.current) {
      refetch();
      wasHidden.current = false;
    }
  }, [documentVisibility]);

  const onResetFilters = () => {
    resetFilters();
    setPage(1);
  };

  return (
    <PageLayout title={'Комнаты общежитий'}>
      <Stack gap={'xl'}>
        <RoomsFilters
          filters={filters}
          setFilters={setFilters}
          resetFilters={onResetFilters}
        />

        <Divider />

        <Stack>
          <DataStatusContainer
            skipLoadingState
            isLoading={isLoading}
            error={error}
            dataLength={data?.data.length ?? 0}
            EmptyComponent={
              <EmptyView
                icon={<IconDoor size={''} />}
                title={'Комнаты не найдены'}
                description={'Попробуйте изменить параметры фильтра'}
              />
            }
          >
            <RoomsTable
              rooms={data?.data ?? []}
              isLoading={isLoading}
              skeletonRowsCount={limit}
              sortDir={sort.sortDir!}
              selectedSortBy={sort.sortBy}
              onSortChange={(sortBy, sortDir) => {
                setSort(sortBy as RoomSortParams, sortDir);
              }}
            />
          </DataStatusContainer>

          <AlignedPagination
            pagination={{
              value: page,
              total: data?.totalPages ?? 0,
              onChange: setPage,
            }}
          />
        </Stack>
      </Stack>
    </PageLayout>
  );
};

export default RoomsPage;
