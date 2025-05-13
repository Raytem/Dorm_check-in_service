import { injectable } from 'inversify';
import { ITokenRepository } from '@domain/repositories';
import Cookies from 'js-cookie';

@injectable()
export class CookieTokenRepository implements ITokenRepository {
  private static readonly ACCESS_TOKEN_COOKIE_NAME = 'token';

  getAccessToken(): string | null {
    const cookieContent = Cookies.get(
      CookieTokenRepository.ACCESS_TOKEN_COOKIE_NAME,
    );
    if (cookieContent === undefined) return null;

    return this.deserializeToken(cookieContent);
  }

  private deserializeToken(cookieContent: string): string {
    return JSON.parse(cookieContent)['access_token'] ?? '';
  }
}
