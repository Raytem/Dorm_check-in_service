import { ITokenRepository } from '@domain/repositories';

export class LocalStorageTokenRepository implements ITokenRepository {
  private readonly accessTokenKey = 'access-token';

  setAccessToken(accessToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  removeAccessToken(): void {
    localStorage.removeItem(this.accessTokenKey);
  }
}
