import { interfaces } from 'inversify';

export interface IUINotificationService {
	showSuccess(message: string, title?: string): void

	showError(error: unknown, title?: string): void

	showWarning(message: string, title?: string): void
}

export namespace IUINotificationService {
	export const $: interfaces.ServiceIdentifier<IUINotificationService> = Symbol('IUINotificationService');
}