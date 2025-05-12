import { UserRoleResponse } from '@infrastructure/api/auth';
import { Role } from '@domain/enums';

export class UserRoleMapper {
  static toDomain(role: UserRoleResponse): Role {
    if (!(role.name in Role)) {
      throw new Error(`Cannot map role with name '${role.name}' to domain`);
    }
    return role.name as Role;
  }
}
