import React from 'react';
import { useParams } from 'react-router-dom';
import { Stack } from '@mantine/core';
import { AppRoutes, AppRoutesParams } from '@routing/app-routes.ts';
import RoomPageLayout from '@components/room/room-page-layout';
import RoomInfoSection from '@components/room/room-info-section';
import ResidentsSectionHeader from '@components/room/residents-section-header';
import ResidentCardList from '@components/room/resident-card-list';
import RelocateResidentModal from '@components/room/modals/relocate-resident/relocate-resident.modal.tsx';
import AddResidentModal from '@components/room/modals/add-resident/add-resident.modal.tsx';
import { useRoomPageActions } from '@pages/room/use-room-page-actions.hook.tsx';

const RoomPage: React.FC = () => {
  const { roomId } = useParams<AppRoutesParams[AppRoutes.ROOM]>();

  const {
    queries: { getRoom, relocateResident, addResident },
    states: { selectedResident, addResidentBlockerReason },
    modals,
    functions,
    handlers: {
      onAddResidentClick,
      onEvictResidentClick,
      onRelocateResidentClick,
      onConfirmResidentCheckInClick,
      onCancelResidentCheckInClick,
    },
  } = useRoomPageActions(roomId ? Number(roomId) : undefined);

  return (
    <RoomPageLayout
      dormitoryNumber={getRoom.data?.dormitoryNumber}
      roomName={getRoom.data?.roomName}
      isLoading={getRoom.isLoading}
      error={getRoom.error}
    >
      {getRoom.data !== null && (
        <Stack gap={'xl'}>
          <RoomInfoSection room={getRoom.data} />

          <ResidentsSectionHeader
            onAddResident={onAddResidentClick}
            addResidentBlockerReason={addResidentBlockerReason}
            isLoading={getRoom.isLoading}
          />

          <ResidentCardList
            residents={getRoom.data.residents}
            isLoading={getRoom.isLoading}
            onEvict={onEvictResidentClick}
            onRelocate={onRelocateResidentClick}
            onConfirmCheckIn={onConfirmResidentCheckInClick}
            onCancelCheckIn={onCancelResidentCheckInClick}
            onSaveNotes={functions.saveResidentNotes}
          />

          {selectedResident !== null && (
            <RelocateResidentModal
              isOpened={modals.relocateResident.isOpened}
              onClose={modals.relocateResident.close}
              resident={selectedResident}
              roomFrom={getRoom.data}
              onRelocate={functions.relocateResident}
              isRelocateLoading={relocateResident.isLoading}
            />
          )}

          <AddResidentModal
            isOpened={modals.addResident.isOpened}
            onClose={modals.addResident.close}
            roomName={getRoom.data.roomName}
            roomId={getRoom.data.id}
            isAddResidentLoading={addResident.isLoading}
            onAddResident={functions.addResident}
          />
        </Stack>
      )}
    </RoomPageLayout>
  );
};

export default RoomPage;
