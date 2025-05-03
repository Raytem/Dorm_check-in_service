import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthenticatedUserEntity } from '@domain/entities';

type AuthenticatedUserStateType = {
  authenticatedUser: AuthenticatedUserEntity | null;
};

const initialState: AuthenticatedUserStateType = {
  // authenticatedUser: null

  // TODO: delete mock
  authenticatedUser: new AuthenticatedUserEntity(
    1,
    'Даниил',
    'Баков',
    'Сергеевич',
    'daniilbakov',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlOLBRK-3wEFFeCojWlHou4nooggl5iI2PJQ&s',
    'daniilbk@yandex.by',
    ['admin'],
  ),
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
