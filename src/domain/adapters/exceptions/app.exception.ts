export class AppException extends Error {
	public readonly originalException?: unknown

	constructor(message: string, originalException?: unknown) {
		super(message);
		this.name = 'AppException'
		this.originalException = originalException

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, AppException);
		}
	}
}