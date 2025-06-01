import React from 'react';
import { Button, Divider, LoadingOverlay, Modal, Stack } from '@mantine/core';
import DataStatusContainer from '@components/shared/data-status-container';
import EmptyView from '@components/shared/empty-view';
import { IconUsers } from '@tabler/icons-react';
import AlignedPagination from '@components/shared/aligned-pagination';
import ResidentsTable from '@components/room/modals/add-resident/residents-table';
import { ResidentId, RoomId } from '@domain/entities';
import ResidentFilters from '@components/room/modals/add-resident/resident-filters';
import { useAddResidentModalActions } from '@components/room/modals/add-resident/use-add-resident-modal-actions.hook.ts';

export interface AddResidentModalProps {
  isOpened: boolean;
  onClose: () => void;
  roomId: RoomId;
  roomName: string;
  isAddResidentLoading: boolean;
  onAddResident: (residentId: ResidentId) => void;
}

const AddResidentModal: React.FC<AddResidentModalProps> = (props) => {
  const {
    constants: { RESIDENTS_PER_PAGE },
    states: { isMobile, selectedResident },
    queries: { getCandidatesForRoom },
    candidatesFilters,
    candidatesPagination,
    handlers: {
      onResetFilters,
      onExitTransitionEnd,
      onResidentRowClick,
      onAddResidentClick,
    },
    functions: { getAddResidentButtonLabel },
  } = useAddResidentModalActions(props);

  const canCloseModal = !props.isAddResidentLoading;

  return (
    <Modal
      opened={props.isOpened}
      onClose={props.onClose}
      onExitTransitionEnd={onExitTransitionEnd}
      title={`Заселение в комнату ${props.roomName}`}
      centered
      size={'var(--app-container-width)'}
      fullScreen={isMobile}
      closeButtonProps={{
        disabled: !canCloseModal,
      }}
      closeOnClickOutside={canCloseModal}
      closeOnEscape={canCloseModal}
    >
      <LoadingOverlay visible={props.isAddResidentLoading} />

      <Stack>
        <Stack gap={'xl'}>
          <ResidentFilters
            filters={candidatesFilters.filters}
            setFilters={candidatesFilters.set}
            onResetFilters={onResetFilters}
          />

          <Divider />

          <Stack>
            <DataStatusContainer
              skipLoadingState
              isLoading={getCandidatesForRoom.isLoading}
              error={getCandidatesForRoom.error}
              dataLength={getCandidatesForRoom.data?.data?.length ?? 0}
              EmptyComponent={
                <EmptyView
                  icon={<IconUsers size={'100%'} />}
                  title={'Студенты не найдены'}
                  description={'Попробуйте изменить параметры фильтра'}
                />
              }
            >
              <ResidentsTable
                residents={getCandidatesForRoom.data?.data ?? []}
                selectedResident={selectedResident}
                isLoading={getCandidatesForRoom.isLoading}
                skeletonRowsCount={RESIDENTS_PER_PAGE}
                onRowClick={onResidentRowClick}
              />
            </DataStatusContainer>

            <AlignedPagination
              pagination={{
                value: candidatesPagination.page,
                total: getCandidatesForRoom.data?.totalPages ?? 0,
                onChange: candidatesPagination.setPage,
              }}
            />
          </Stack>
        </Stack>

        <Button
          onClick={onAddResidentClick}
          disabled={selectedResident === null || getCandidatesForRoom.isLoading}
        >
          {getAddResidentButtonLabel()}
        </Button>
      </Stack>
    </Modal>
  );
};

export default AddResidentModal;
