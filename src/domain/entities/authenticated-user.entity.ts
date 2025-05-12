import { Role } from '@domain/enums';

export type UserId = string;

export interface AuthenticatedUserEntity {
  id: UserId;
  firstName: string;
  lastName: string;
  patronymic: string;
  userName: string;
  avatarUrl: string | null;
  email: string;
  roles: Role[];
}
