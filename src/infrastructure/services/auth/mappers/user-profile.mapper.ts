import { UserProfileResponse } from '@infrastructure/api/auth';
import { AuthenticatedUserEntity } from '@domain/entities';
import { UrlUtil } from '@infrastructure/utils';
import { UserRoleMapper } from '@infrastructure/mappers/user-role.mapper.ts';
import { Role } from '@domain/enums';

export class UserProfileMapper {
  static toDomain(
    userProfile: UserProfileResponse,
    fileServerBaseUrl: string,
  ): AuthenticatedUserEntity {
    const roles: Role[] = [];
    userProfile.roles.forEach((r) => {
      try {
        roles.push(UserRoleMapper.toDomain(r));
      } catch {}
    });

    return {
      id: userProfile.externalId,
      firstName: userProfile.name,
      lastName: userProfile.surname,
      patronymic: userProfile.patronymic,
      userName: userProfile.username,
      avatarUrl:
        UrlUtil.withBaseUrlIfRelative(
          userProfile.photoUrl,
          fileServerBaseUrl,
        ) ?? null,
      email: userProfile.email,
      roles,
    };
  }
}
