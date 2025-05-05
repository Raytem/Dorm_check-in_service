import { useInjection } from 'inversify-react';
import { GetRoomsUseCase } from '@usecases/rooms';
import { useFetch, useQueryPagination, useQuerySort } from '@hooks/shared';
import { useQueryRoomFilters } from '@hooks/rooms';
import { RoomSortParams, SortDirection } from '@domain/enums';
import { useEffect } from 'react';

export const useRoomsPageActions = () => {
  const ROOMS_PER_PAGE = 20;

  const getRoomsUseCase = useInjection(GetRoomsUseCase);

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

  const filtersDeps = [
    filters.blockType,
    filters.roomName,
    filters.onlyAvailableRooms,
    filters.blockNumber,
    filters.dormitoryNumber,
    filters.studentGroup,
    filters.floor,
  ];

  const sortDeps = [sort.sortBy, sort.sortDir];

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    refetch();
  }, [...filtersDeps, ...sortDeps, page, limit]);

  useEffect(() => {
    setPage(1);
  }, [...filtersDeps, ...sortDeps]);

  const onResetFilters = () => {
    resetFilters();
  };

  return {
    queries: {
      getRooms: {
        data: data,
        isLoading: isLoading,
        error: error,
        refetch: refetch,
      },
    },
    roomsFilters: {
      filters,
      set: setFilters,
      reset: resetFilters,
    },
    roomsSort: {
      sort,
      set: setSort,
    },
    roomsPagination: {
      page,
      limit,
      setPage,
    },
    handlers: {
      onResetFilters,
    },
  };
};
