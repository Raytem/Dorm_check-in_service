import { Divider, Stack } from '@mantine/core';
import { IconDoor } from '@tabler/icons-react';

import PageLayout from 'presentation/layouts/page';

import RoomsTable from '../../components/rooms/rooms-table';
import RoomsFilters from '../../components/rooms/rooms-filters';

import EmptyView from '@components/shared/empty-view';
import DataStatusContainer from '@components/shared/data-status-container';
import AlignedPagination from '@components/shared/aligned-pagination';

import { RoomSortParams } from '@domain/enums';
import { useRoomsPageActions } from '@pages/rooms/use-rooms-page-actions.hook';

const RoomsPage = () => {
  const {
    queries: { getRooms },
    roomsFilters,
    roomsSort,
    roomsPagination,
    handlers: { onResetFilters },
  } = useRoomsPageActions();

  return (
    <PageLayout title={'Комнаты общежитий'}>
      <Stack gap={'xl'}>
        <RoomsFilters
          filters={roomsFilters.filters}
          setFilters={roomsFilters.set}
          resetFilters={onResetFilters}
        />

        <Divider />

        <Stack>
          <DataStatusContainer
            skipLoadingState
            isLoading={getRooms.isLoading}
            error={getRooms.error}
            dataLength={getRooms.data?.data.length ?? 0}
            EmptyComponent={
              <EmptyView
                icon={<IconDoor size={'100%'} />}
                title={'Комнаты не найдены'}
                description={'Попробуйте изменить параметры фильтра'}
              />
            }
          >
            <RoomsTable
              rooms={getRooms.data?.data ?? []}
              isLoading={getRooms.isLoading}
              skeletonRowsCount={roomsPagination.limit}
              sortDir={roomsSort.sort.sortDir!}
              selectedSortBy={roomsSort.sort.sortBy}
              onSortChange={(sortBy, sortDir) => {
                roomsSort.set(sortBy as RoomSortParams, sortDir);
              }}
            />
          </DataStatusContainer>

          <AlignedPagination
            pagination={{
              value: roomsPagination.page,
              total: getRooms.data?.totalPages ?? 0,
              onChange: roomsPagination.setPage,
            }}
          />
        </Stack>
      </Stack>
    </PageLayout>
  );
};

export default RoomsPage;
