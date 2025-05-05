import { useInjection } from 'inversify-react';
import { GetCandidatesForRoomUseCase } from '@usecases/residents';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { GetCandidatesForRoomFilters } from '@domain/types';
import { useFetch } from '@hooks/shared';
import { ResidentEntity } from '@domain/entities';
import { AddResidentModalProps } from '@components/room/modals/add-resident/add-resident.modal.tsx';

export const useAddResidentModalActions = (props: AddResidentModalProps) => {
  const RESIDENTS_PER_PAGE = 10;

  const getCandidatesForRoomUseCase = useInjection(GetCandidatesForRoomUseCase);
  const isMobile = useMediaQuery('(max-width: 50em)');

  const [filters, setFilters] = useState<GetCandidatesForRoomFilters>({});
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, error, refetch, setData } = useFetch(async () => {
    return await getCandidatesForRoomUseCase.execute(props.roomId, {
      limit: RESIDENTS_PER_PAGE,
      page,
    });
  });

  const [selectedResident, setSelectedResident] =
    useState<ResidentEntity | null>(null);

  useEffect(() => {
    if (!props.isOpened) return;
    refetch();
  }, [
    page,
    props.isOpened,
    filters.fullName,
    filters.groupName,
    filters.facultyName,
    filters.gradeBookNumber,
  ]);

  useEffect(() => {
    setPage(1);
    setSelectedResident(null);
  }, [
    filters.fullName,
    filters.groupName,
    filters.facultyName,
    filters.gradeBookNumber,
  ]);

  const clearState = () => {
    setSelectedResident(null);
    setData(null);
  };

  const getAddResidentButtonLabel = () => {
    if (selectedResident === null) {
      return 'Выберите студента';
    }
    return `Заселить студента "${selectedResident.lastName} ${selectedResident.firstName}"`;
  };

  // handlers

  const onResetFilters = () => {
    setPage(1);
  };

  const onExitTransitionEnd = () => {
    clearState();
  };

  const onResidentRowClick = (resident: ResidentEntity) => {
    if (selectedResident !== null && selectedResident.id === resident.id) {
      setSelectedResident(null);
      return;
    }
    setSelectedResident(resident);
  };

  const onAddResidentClick = () => {
    if (selectedResident === null) return;
    props.onAddResident(selectedResident.id);
  };

  return {
    constants: {
      RESIDENTS_PER_PAGE,
    },
    states: {
      selectedResident,
      isMobile,
    },
    queries: {
      getCandidatesForRoom: {
        data,
        isLoading,
        error,
        refetch,
      },
    },
    candidatesFilters: {
      filters: filters,
      set: setFilters,
    },
    candidatesPagination: {
      page,
      setPage,
    },
    handlers: {
      onResetFilters,
      onExitTransitionEnd,
      onResidentRowClick,
      onAddResidentClick,
    },
    functions: {
      getAddResidentButtonLabel,
    },
  };
};
