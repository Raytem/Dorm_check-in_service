import { AppException } from './app.exception.ts';

export class DomainException extends AppException {
  constructor(message: string, originalError?: unknown) {
    super(message, originalError);
    this.name = 'DomainException';
  }
}
