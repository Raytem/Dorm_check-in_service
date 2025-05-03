import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useInjection } from 'inversify-react';
import {
  EvictResidentUseCase,
  GetRoomDetailsUseCase,
  RelocateResidentUseCase,
  UpdateResidentInfoUseCase,
} from '@/usecases/rooms';
import { useFetch } from '@hooks/shared';
import { useEffect } from 'react';
import { Stack, Text } from '@mantine/core';
import { AppRoutes, AppRoutesParams } from '@routing/app-routes.ts';
import { ResidentEntity } from '@domain/entities';
import { modalManager } from '@infrastructure/services/modal-manager/modal-manager.tsx';
import { useDisclosure } from '@mantine/hooks';
import RoomPageLayout from '@components/room/room-page-layout';
import RoomInfoSection from '@components/room/room-info-section';
import ResidentsSectionHeader from '@components/room/residents-section-header';
import ResidentCardList from '@components/room/resident-card-list';
import RelocateResidentModal from '@components/room/modals/relocate-resident/relocate-resident.modal.tsx';
import { modals } from '@mantine/modals';
import AddResidentModal from '@components/room/modals/add-resident/add-resident.modal.tsx';
import { AddResidentUseCase } from '@usecases/rooms/add-resident/add-resident.usecase.ts';

const RoomPage: React.FC = () => {
  const { roomId } = useParams<AppRoutesParams[AppRoutes.ROOM]>();

  const gatRoomDetailsUseCase = useInjection(GetRoomDetailsUseCase);
  const evictResidentUseCase = useInjection(EvictResidentUseCase);
  const updateResidentInfoUseCase = useInjection(UpdateResidentInfoUseCase);
  const relocateResidentUseCase = useInjection(RelocateResidentUseCase);
  const addResidentUseCase = useInjection(AddResidentUseCase);

  const [selectedResident, setSelectedResident] =
    useState<ResidentEntity | null>(null);

  const [
    isRelocateModalOpened,
    { open: openRelocateModal, close: closeRelocateModal },
  ] = useDisclosure(false);

  const [
    isAddResidentModalOpened,
    { open: openAddResidentModal, close: closeAddResidentModal },
  ] = useDisclosure(false);

  const {
    data: room,
    isLoading: isRoomLoading,
    error: roomError,
    refetch: refetchRoom,
  } = useFetch(async () => {
    if (roomId === undefined) return null;
    return await gatRoomDetailsUseCase.execute(Number(roomId));
  }, true);

  const { isLoading: isRelocateLoading, refetch: refetchRelocate } = useFetch(
    async (params: { residentId: number; newRoomId: number }) => {
      await relocateResidentUseCase.execute(
        params.residentId,
        params.newRoomId,
      );
    },
  );

  const { isLoading: isAddResidentLoading, refetch: refetchAddResident } =
    useFetch(async (params: { roomId: number; residentId: number }) => {
      await addResidentUseCase.execute(params.roomId, params.residentId);
    });

  useEffect(() => {
    window.scrollTo({ top: 0 });
    (async () => refetchRoom())();
  }, []);

  const onRelocateResident = async (
    resident: ResidentEntity,
    newRoomId: number,
  ) => {
    try {
      await refetchRelocate({
        params: {
          residentId: resident.id,
          newRoomId,
        },
      });
      modalManager.showSuccess('Студент был успешно переселен');
    } catch (e) {
      modalManager.showError('Не удалось переселить студента', { error: e });
    } finally {
      closeRelocateModal();
    }

    await refetchRoom({ showLoadingState: false });
  };

  const onAddResident = async (residentId: number) => {
    if (room === null) return;

    try {
      await refetchAddResident({
        params: {
          roomId: room.id,
          residentId: residentId,
        },
      });
      modalManager.showSuccess('Студент был успешно заселен');
    } catch (e) {
      modalManager.showError('Не удалось заселить студента', { error: e });
    } finally {
      closeAddResidentModal();
    }

    await refetchRoom({ showLoadingState: false });
  };

  // handlers

  const onAddResidentClick = async () => {
    openAddResidentModal();
  };

  const onEvictResidentClick = async (resident: ResidentEntity) => {
    modals.openConfirmModal({
      title: 'Выселение студента',
      centered: true,
      confirmProps: { color: 'red' },
      children: (
        <Text>
          Вы уверены что хотите выселить студента {resident.getFullName()}?
        </Text>
      ),
      labels: { confirm: 'Выселить', cancel: 'Отменить' },
      onConfirm: async () => {
        try {
          await evictResidentUseCase.execute(resident.id);
          modalManager.showSuccess(
            `Студент ${resident.getFullName()} был успешно выселен`,
          );
        } catch (e) {
          modalManager.showError('Не удалось выселить студента', {
            error: e,
          });
        }
        await refetchRoom({ showLoadingState: false });
      },
    });
  };

  const onRelocateResidentClick = (resident: ResidentEntity) => {
    if (!room) return;
    openRelocateModal();
    setSelectedResident(resident);
  };

  const onConfirmResidentCheckInClick = async (resident: ResidentEntity) => {
    modals.openConfirmModal({
      title: 'Подтверждение заселения студента',
      centered: true,
      children: (
        <Text>Подтвердить заселение студента {resident.getFullName()}?</Text>
      ),
      labels: { confirm: 'Подтвердить', cancel: 'Отменить' },
      onConfirm: async () => {
        try {
          await updateResidentInfoUseCase.execute(resident.id, {
            isCheckInConfirmed: true,
          });
          modalManager.showSuccess('Заселение было успешно подтверждено');
        } catch (e) {
          modalManager.showError('Не удалось подтвердить заселение', {
            error: e,
          });
        }
        await refetchRoom({ showLoadingState: false });
      },
    });
  };

  const onCancelResidentCheckInClick = async (resident: ResidentEntity) => {
    modals.openConfirmModal({
      title: 'Отмена подтверждения заселения',
      centered: true,
      confirmProps: { color: 'red' },
      children: (
        <Text>
          Отменить подтверждение о заселении студента {resident.getFullName()}?
        </Text>
      ),
      labels: { confirm: 'Да', cancel: 'Нет' },
      onConfirm: async () => {
        try {
          await updateResidentInfoUseCase.execute(resident.id, {
            isCheckInConfirmed: false,
          });
          modalManager.showSuccess('Подтверждение заселения отменено');
        } catch (e) {
          modalManager.showError(
            'Не удалось отменить подтверждение заселения',
            {
              error: e,
            },
          );
        }
        await refetchRoom({ showLoadingState: false });
      },
    });
  };

  return (
    <RoomPageLayout
      dormitoryNumber={room?.dormitoryNumber}
      roomName={room?.roomName}
      isLoading={isRoomLoading}
      error={roomError}
    >
      {room !== null && (
        <Stack gap={'xl'}>
          <RoomInfoSection room={room} />

          <ResidentsSectionHeader onAddResident={onAddResidentClick} />

          <ResidentCardList
            residents={room.residents}
            isLoading={isRoomLoading}
            onEvict={onEvictResidentClick}
            onRelocate={onRelocateResidentClick}
            onConfirmCheckIn={onConfirmResidentCheckInClick}
            onCancelResidentCheckIn={onCancelResidentCheckInClick}
          />

          {selectedResident !== null && (
            <RelocateResidentModal
              isOpened={isRelocateModalOpened}
              onClose={closeRelocateModal}
              resident={selectedResident}
              roomFrom={room}
              onRelocate={onRelocateResident}
              isRelocateLoading={isRelocateLoading}
            />
          )}

          <AddResidentModal
            isOpened={isAddResidentModalOpened}
            onClose={closeAddResidentModal}
            roomName={room.roomName}
            roomId={room.id}
            isAddResidentLoading={isAddResidentLoading}
            onAddResident={onAddResident}
          />
        </Stack>
      )}
    </RoomPageLayout>
  );
};

export default RoomPage;
