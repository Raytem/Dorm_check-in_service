import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthenticatedUserEntity } from '@domain/entities';
import { Role } from '@domain/enums';

type AuthenticatedUserStateType = {
  authenticatedUser: AuthenticatedUserEntity | null;
};

const initialState: AuthenticatedUserStateType = {
  // authenticatedUser: null,

  // TODO: delete mock
  authenticatedUser: {
    id: '234',
    firstName: 'Тест',
    lastName: 'Тестович',
    patronymic: 'Тестов',
    userName: '234234',
    avatarUrl: 'some/test/image.png',
    email: 'test@gmail.com',
    roles: [Role.ROLE_CIT],
  },
};

export const authenticatedUserSlice = createSlice({
  name: 'authenticatedUser',
  initialState,
  selectors: {
    selectAuthenticatedUser: (state: AuthenticatedUserStateType) => {
      return state;
    },

    isUserAuthenticated: (state: AuthenticatedUserStateType) => {
      return state.authenticatedUser !== null;
    },
  },
  reducers: {
    setAuthenticatedUser: (
      _: AuthenticatedUserStateType,
      action: PayloadAction<AuthenticatedUserEntity>,
    ): AuthenticatedUserStateType => {
      return {
        authenticatedUser: action.payload,
      };
    },

    clearAuthenticatedUser: (
      _1: AuthenticatedUserStateType,
      _2: PayloadAction<null>,
    ): AuthenticatedUserStateType => {
      return {
        authenticatedUser: null,
      };
    },
  },
});

export const { setAuthenticatedUser, clearAuthenticatedUser } =
  authenticatedUserSlice.actions;

export const { selectAuthenticatedUser, isUserAuthenticated } =
  authenticatedUserSlice.selectors;
