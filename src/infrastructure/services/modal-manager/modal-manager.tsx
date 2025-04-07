import { modals } from '@mantine/modals';
import {
  IconAlertCircle,
  IconCircleCheck,
  IconCircleXFilled,
} from '@tabler/icons-react';
import { ErrorUtil } from '@presentation/utils';
import StatusModal from '@components/shared/modals/status-modal.tsx';

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

  showError(title?: string, params?: { body?: string; error?: unknown }): void {
    const errorMessage = ErrorUtil.parseError(params?.error);

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
          body={params?.body ?? errorMessage}
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
}

export const modalManager = new ModalManager();
