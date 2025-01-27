import { inject } from 'inversify';

import { IAuthService, LoginDto, LoginResponse, TokensResponse } from '@domain/adapters/services/auth-service';

import * as AuthApi from '@infrastructure/api/auth'
import { AppException, ERROR_MESSAGES } from '@domain/adapters/exceptions';

import { LoginResponseMapper, RefreshTokensResponseMapper } from './mappers';
import axios from 'axios';
import { ConfigService } from '@infrastructure/services';


export class AuthService implements IAuthService {
    constructor(
        @inject(ConfigService)
        private readonly config: ConfigService,
        @inject(AuthApi.AuthApiHttpService)
        private readonly authApiHttpService: AuthApi.AuthApiHttpService
    ) {}

    async login(dto: LoginDto): Promise<LoginResponse> {
        try {
            const response = await this.authApiHttpService.instance.post<AuthApi.LoginResponse>('/auth/admin/login', dto)
            return LoginResponseMapper.toDomain(response.data)
        } catch (error) {
            throw new AppException(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS, error)
        }
    }

    async logout(): Promise<void> {
        try {
            await this.authApiHttpService.instance.post('/auth/logout', {}, {
                withCredentials: true
            })
        } catch (error) {
            throw new AppException(ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR, error)
        }
    }

    async refreshTokens(): Promise<TokensResponse> {
        const baseUrl = this.config.getConfig().authApi.baseUrl

        try {
            // dont use authApi axios instance because of interceptor circular requests
            const response = await axios.post<AuthApi.RefreshTokensResponse>(`${baseUrl}/auth/refresh-tokens`, {}, {
                withCredentials: true
            })
            return RefreshTokensResponseMapper.toDomain(response.data)
        } catch (error) {
            throw new AppException(ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR, error)
        }
    }

}