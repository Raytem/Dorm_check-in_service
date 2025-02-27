import React from 'react';
import { injectable } from 'inversify';
import {
	IUINotificationService
} from '@domain/adapters/services/ui-notification';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconCheck, IconX } from '@tabler/icons-react';
import { ErrorUtil } from '@presentation/utils';


@injectable()
export class UINotificationService implements IUINotificationService {
    showSuccess(message: string, title?: string): void {
        notifications.show({
            title: title ?? 'Успех',
            message,
            color: 'green',
            icon: React.createElement(IconCheck),
            autoClose: 3000,
            position: 'bottom-right',
            withBorder: true,
        });
    }
    showError(error: unknown, title?: string): void {
        const errorMessage = ErrorUtil.parseError(error);
        notifications.show({
            title: title ?? 'Ошибка',
            message: errorMessage,
            color: 'red',
            icon: React.createElement(IconX),
            autoClose: 5000,
            position: 'bottom-right',
            withBorder: true,
        });
    }

    showWarning(message: string, title?: string): void {
        notifications.show({
            title: title ?? 'Предупреждение',
            message,
            color: 'yellow',
            icon: React.createElement(IconAlertCircle),
            autoClose: 4000,
            position: 'bottom-right',
            withBorder: true,
        });
    }
}