import { modals } from '@mantine/modals';
import { Text } from '@mantine/core';
import {
  IconAlertCircle,
  IconCircleCheck,
  IconCircleXFilled,
} from '@tabler/icons-react';
import { ErrorUtil } from '@presentation/utils';
import StatusModal from '@components/shared/modals/status-modal.tsx';
import { ResidentEntity, RoomEntity } from '@domain/entities';
import RelocateResidentModal from '@components/room/modals/relocate-resident/relocate-resident.modal.tsx';

class ModalManager {
  private static readonly STATUS_MODAL_ICON_SIZE = 60;

  showSuccess(title?: string, body?: string): void {
    modals.open({
      centered: true,
      children: (
        <StatusModal
          icon={
            <IconCircleCheck
              size={ModalManager.STATUS_MODAL_ICON_SIZE}
              color={'var(--mantine-color-green-6)'}
            />
          }
          title={title ?? 'Успех'}
          body={body}
          onButtonClick={() => modals.closeAll()}
        />
      ),
    });
  }

  showError(title?: string, body?: string, error?: unknown): void {
    const errorMessage = ErrorUtil.parseError(error);

    modals.open({
      centered: true,
      children: (
        <StatusModal
          icon={
            <IconCircleXFilled
              size={ModalManager.STATUS_MODAL_ICON_SIZE}
              color={'var(--mantine-color-red-6)'}
            />
          }
          title={title ?? 'Ошибка'}
          body={body ?? errorMessage}
          onButtonClick={() => modals.closeAll()}
        />
      ),
    });
  }

  showWarning(title?: string, body?: string): void {
    modals.open({
      centered: true,
      children: (
        <StatusModal
          icon={
            <IconAlertCircle
              size={ModalManager.STATUS_MODAL_ICON_SIZE}
              color={'var(--mantine-color-yellow-6)'}
            />
          }
          title={title ?? 'Ошибка'}
          body={body}
          onButtonClick={() => modals.closeAll()}
        />
      ),
    });
  }

  openConfirmResidentEvictionModal(
    residentFullName: string,
    onConfirm: () => void,
  ): string {
    return modals.openConfirmModal({
      title: 'Выселение студента',
      centered: true,
      confirmProps: { color: 'red' },
      children: (
        <Text>Вы уверены что хотите выселить студента {residentFullName}?</Text>
      ),
      labels: { confirm: 'Выселить', cancel: 'Отменить' },
      onConfirm,
    });
  }

  openRelocateResidentModal(
    resident: ResidentEntity,
    roomFrom: RoomEntity,
    isRelocateLoading: boolean,
    onRelocate: (roomId: number) => void,
  ): string {
    return modals.open({
      title: `Переселение студента ${resident.getFullName()} из комнаты ${roomFrom.roomName}`,
      centered: true,
      children: (
        <RelocateResidentModal
          resident={resident}
          onRelocate={onRelocate}
          isRelocateLoading={isRelocateLoading}
        />
      ),
    });
  }
}

export const modalManager = new ModalManager();
