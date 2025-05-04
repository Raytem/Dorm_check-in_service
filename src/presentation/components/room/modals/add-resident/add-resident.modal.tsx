import React, { useEffect, useState } from 'react';
import { Button, Divider, LoadingOverlay, Modal, Stack } from '@mantine/core';
import DataStatusContainer from '@components/shared/data-status-container';
import EmptyView from '@components/shared/empty-view';
import { IconUsers } from '@tabler/icons-react';
import AlignedPagination from '@components/shared/aligned-pagination';
import ResidentsTable from '@components/room/modals/add-resident/residents-table';
import { ResidentEntity, RoomId } from '@domain/entities';
import { useMediaQuery } from '@mantine/hooks';
import { useInjection } from 'inversify-react';
import { GetCandidatesForRoomUseCase } from '@/usecases/residents';
import { useFetch } from '@hooks/shared';
import ResidentFilters from '@components/room/modals/add-resident/resident-filters';
import { GetCandidatesForRoomFilters } from '@domain/types';

export interface AddResidentModalProps {
  isOpened: boolean;
  onClose: () => void;
  roomId: RoomId;
  roomName: string;
  isAddResidentLoading: boolean;
  onAddResident: (residentId: number) => void;
}

const AddResidentModal: React.FC<AddResidentModalProps> = ({
  isOpened,
  onClose,
  roomId,
  roomName,
  isAddResidentLoading = false,
  onAddResident,
}) => {
  const RESIDENTS_PER_PAGE = 10;

  const getCandidatesForRoomUseCase = useInjection(GetCandidatesForRoomUseCase);
  const isMobile = useMediaQuery('(max-width: 50em)');

  const [filters, setFilters] = useState<GetCandidatesForRoomFilters>({});
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, error, refetch, setData } = useFetch(async () => {
    return await getCandidatesForRoomUseCase.execute(roomId, {
      limit: RESIDENTS_PER_PAGE,
      page,
    });
  });

  const [selectedResident, setSelectedResident] =
    useState<ResidentEntity | null>(null);

  useEffect(() => {
    if (!isOpened) return;
    refetch();
  }, [
    page,
    isOpened,
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

  const onResetFilters = () => {
    setPage(1);
  };

  const clearState = () => {
    setSelectedResident(null);
    setData(null);
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
    onAddResident(selectedResident.id);
  };

  const getAddResidentButtonLabel = () => {
    if (selectedResident === null) {
      return 'Выберите студента';
    }
    return `Заселить студента "${selectedResident.lastName} ${selectedResident.firstName}"`;
  };

  return (
    <Modal
      opened={isOpened}
      onClose={onClose}
      onExitTransitionEnd={onExitTransitionEnd}
      title={`Заселение в комнату ${roomName}`}
      centered
      size={'var(--app-container-width)'}
      fullScreen={isMobile}
    >
      <LoadingOverlay visible={isAddResidentLoading} />

      <Stack>
        <Stack gap={'xl'}>
          <ResidentFilters
            filters={filters}
            setFilters={setFilters}
            onResetFilters={onResetFilters}
          />

          <Divider />

          <Stack>
            <DataStatusContainer
              skipLoadingState
              isLoading={isLoading}
              error={error}
              dataLength={data?.data?.length ?? 0}
              EmptyComponent={
                <EmptyView
                  icon={<IconUsers size={'100%'} />}
                  title={'Студенты не найдены'}
                  description={'Попробуйте изменить параметры фильтра'}
                />
              }
            >
              <ResidentsTable
                residents={data?.data ?? []}
                selectedResident={selectedResident}
                isLoading={isLoading}
                skeletonRowsCount={RESIDENTS_PER_PAGE}
                onRowClick={onResidentRowClick}
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

        <Button
          onClick={onAddResidentClick}
          disabled={selectedResident === null || isLoading}
        >
          {getAddResidentButtonLabel()}
        </Button>
      </Stack>
    </Modal>
  );
};

export default AddResidentModal;
