import React from 'react';
import { useParams } from 'react-router-dom';
import { useInjection } from 'inversify-react';
import { GetRoomDetailsUseCase } from '@/usecases';
import { useFetch } from '@hooks/shared';
import { useEffect } from 'react';
import { Stack } from '@mantine/core';
import { AppRoutes, AppRoutesParams } from '@routing/app-routes.ts';
import { ResidentEntity } from '@domain/entities';
import { modalManager } from '@infrastructure/services/modal-manager/modal-manager.tsx';
import { useDocumentVisibility } from '@mantine/hooks';
import RoomPageLayout from '@components/room/room-page-layout';
import RoomInfoSection from '@components/room/room-info-section';
import ResidentsSectionHeader from '@components/room/residents-section-header';
import ResidentCardList from '@components/room/resident-card-list';

const RoomPage: React.FC = () => {
  const { roomId } = useParams<AppRoutesParams[AppRoutes.ROOM]>();
  const documentVisibility = useDocumentVisibility();
  const gatRoomDetailsUseCase = useInjection(GetRoomDetailsUseCase);

  const {
    data: room,
    isLoading: isRoomLoading,
    error: roomError,
    refetch: refetchRoom,
  } = useFetch(async () => {
    if (roomId === undefined) return null;
    return await gatRoomDetailsUseCase.execute(Number(roomId));
  }, true);

  useEffect(() => {
    if (documentVisibility === 'hidden') return;
    refetchRoom(false);
  }, [documentVisibility]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    refetchRoom();
  }, []);

  const onAddResident = () => {
    // TODO: запуск юзкейса
    refetchRoom(false);
    modalManager.showSuccess('Студент успешно заселен');
  };

  const onEvictResident = (resident: ResidentEntity) => {
    modalManager.openConfirmResidentEvictionModal(
      resident.getFullName(),
      () => {
        // TODO: запуск юзкейса
        refetchRoom(false);
        modalManager.showSuccess('Студент успешно выселен');
      },
    );
  };

  const onRelocateResident = (resident: ResidentEntity) => {
    // TODO: запуск юзкейса
    if (!room) return;

    modalManager.openRelocateResidentModal(
      resident,
      room,
      false, // TODO: add relocate loading state
      async (roomId) => {
        refetchRoom(false);
        modalManager.showSuccess(`Студент успешно переселен ${roomId}`); //TODO: удалить id
      },
    );
  };

  const onConfirmResidentCheckIn = (_resident: ResidentEntity) => {
    // TODO: запуск юзкейса
    refetchRoom(false);
    modalManager.showSuccess('Заселение успешно подтверждено');
  };

  const onCancelResidentCheckIn = (_resident: ResidentEntity) => {
    // TODO: запуск юзкейса
    refetchRoom(false);
    modalManager.showSuccess('Подтверждение о заселении отменено');
  };

  return (
    <RoomPageLayout
      dormitoryNumber={room?.dormitoryNumber}
      roomName={room?.roomName}
      isLoading={isRoomLoading}
      error={roomError}
    >
      <Stack gap={'xl'}>
        <RoomInfoSection room={room} />

        <ResidentsSectionHeader onAddResident={onAddResident} />

        <ResidentCardList
          residents={room?.residents ?? []}
          isLoading={isRoomLoading}
          onEvict={onEvictResident}
          onRelocate={onRelocateResident}
          onConfirmCheckIn={onConfirmResidentCheckIn}
          onCancelResidentCheckIn={onCancelResidentCheckIn}
        />
      </Stack>
    </RoomPageLayout>
  );
};

export default RoomPage;
