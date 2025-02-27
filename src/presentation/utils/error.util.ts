import { AppException, ERROR_MESSAGES } from '@domain/adapters/exceptions';

export class ErrorUtil {
	static parseError(error: unknown): string {
		if (error instanceof AppException) {
			return error.message;
		}
		return ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR;
	}
}