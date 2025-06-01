import { ResidentEntity, ResidentId, RoomId } from '@domain/entities';
import { useInjection } from 'inversify-react';
import {
  AddResidentUseCase,
  EvictResidentUseCase,
  GetRoomDetailsUseCase,
  RelocateResidentUseCase,
} from '@usecases/rooms';
import { UpdateResidentInfoUseCase } from '@usecases/residents';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useFetch } from '@hooks/shared';
import { modalManager } from '@infrastructure/services/modal-manager/modal-manager.tsx';
import { modals } from '@mantine/modals';
import { Text } from '@mantine/core';

export const useRoomPageActions = (roomId: RoomId | undefined) => {
  const gatRoomDetailsUseCase = useInjection(GetRoomDetailsUseCase);
  const evictResidentUseCase = useInjection(EvictResidentUseCase);
  const updateResidentInfoUseCase = useInjection(UpdateResidentInfoUseCase);
  const relocateResidentUseCase = useInjection(RelocateResidentUseCase);
  const addResidentUseCase = useInjection(AddResidentUseCase);

  const [selectedResident, setSelectedResident] =
    useState<ResidentEntity | null>(null);

  const [addResidentBlockerReason, setAddResidentBlockerReason] = useState<
    string | null
  >(null);

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
    async (params: { residentId: ResidentId; newRoomId: RoomId }) => {
      await relocateResidentUseCase.execute(
        params.residentId,
        params.newRoomId,
      );
    },
  );

  const { isLoading: isAddResidentLoading, refetch: refetchAddResident } =
    useFetch(async (params: { roomId: RoomId; residentId: ResidentId }) => {
      await addResidentUseCase.execute(params.roomId, params.residentId);
    });

  useEffect(() => {
    window.scrollTo({ top: 0 });
    (async () => refetchRoom())();
  }, []);

  useEffect(() => {
    if (room !== null && room.availablePlacesCount <= 0) {
      setAddResidentBlockerReason('В комнате не осталось свободных мест');
      return;
    }

    setAddResidentBlockerReason(null);
  }, [room?.availablePlacesCount, room?.residents]);

  // functions

  const saveResidentNotes = async (resident: ResidentEntity, notes: string) => {
    await updateResidentInfoUseCase.execute(resident.id, {
      note: notes,
    });
  };

  const relocateResident = async (
    resident: ResidentEntity,
    newRoomId: RoomId,
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

  const addResident = async (residentId: ResidentId) => {
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

  const evictResident = async (resident: ResidentEntity) => {
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
  };

  const confirmResidentCheckIn = async (resident: ResidentEntity) => {
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
  };

  const cancelResidentCheckInClick = async (resident: ResidentEntity) => {
    try {
      await updateResidentInfoUseCase.execute(resident.id, {
        isCheckInConfirmed: false,
      });
      modalManager.showSuccess('Подтверждение заселения отменено');
    } catch (e) {
      modalManager.showError('Не удалось отменить подтверждение заселения', {
        error: e,
      });
    }
    await refetchRoom({ showLoadingState: false });
  };

  // handlers

  const onRelocateResidentClick = (resident: ResidentEntity) => {
    if (!room) return;
    openRelocateModal();
    setSelectedResident(resident);
  };

  const onAddResidentClick = async () => {
    if (!room) return;
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
        await evictResident(resident);
      },
    });
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
        await confirmResidentCheckIn(resident);
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
        await cancelResidentCheckInClick(resident);
      },
    });
  };

  return {
    queries: {
      getRoom: {
        isLoading: isRoomLoading,
        error: roomError,
        data: room,
        refetch: refetchRoom,
      },
      relocateResident: {
        isLoading: isRelocateLoading,
        refetch: refetchRelocate,
      },
      addResident: {
        isLoading: isAddResidentLoading,
        refetch: refetchAddResident,
      },
    },
    states: {
      addResidentBlockerReason,
      selectedResident,
    },
    modals: {
      relocateResident: {
        isOpened: isRelocateModalOpened,
        open: openRelocateModal,
        close: closeRelocateModal,
      },
      addResident: {
        isOpened: isAddResidentModalOpened,
        open: openAddResidentModal,
        close: closeAddResidentModal,
      },
    },
    functions: {
      relocateResident,
      addResident,
      saveResidentNotes,
    },
    handlers: {
      onAddResidentClick,
      onEvictResidentClick,
      onRelocateResidentClick,
      onConfirmResidentCheckInClick,
      onCancelResidentCheckInClick,
    },
  };
};
