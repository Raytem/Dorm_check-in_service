import { UserRoleResponse } from '@infrastructure/api/auth';

export interface UserProfileResponse {
  message: string | null;
  externalId: string;
  authHelper: string;
  infoHelper: string;
  username: string;
  surname: string;
  name: string;
  patronymic: string;
  email: string;
  photoUrl: string;
  roles: UserRoleResponse[];
  fullName: string;
}
