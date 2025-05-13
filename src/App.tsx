import React, { useEffect } from 'react';
import { useInjection } from 'inversify-react';
import { IAuthService } from '@domain/adapters/services/auth-service';
import { useAppDispatch, useAppSelector } from '@application/store';
import {
  isUserAuthenticated,
  setAuthenticatedUser,
} from '@application/store/slices';
import LoadingPage from '@pages/loading-page';

export interface AppProps {
  children?: React.ReactNode;
}

function App({ children = <></> }: AppProps) {
  const authService = useInjection(IAuthService.$);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(isUserAuthenticated);

  useEffect(() => {
    (async () => {
      const result = await authService.checkAuthorization();

      if (result.isAuthorized) {
        try {
          const user = await authService.getUserProfile();
          dispatch(setAuthenticatedUser(user));
        } catch {
          authService.redirectToLogin();
        }
        return;
      }

      if (result.statusCode === 403) {
        authService.redirectToForbidden();
      } else {
        authService.redirectToLogin();
      }
    })();
  }, []);

  return isAuthenticated ? children : <LoadingPage />;
}

export default App;
