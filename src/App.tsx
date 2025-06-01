import { useEffect } from 'react';
import { useInjection } from 'inversify-react';
import { IAuthService } from '@domain/adapters/services/auth-service';
import { useAppDispatch, useAppSelector } from '@application/store';
import {
  isUserAuthenticated,
  setAuthenticatedUser,
} from '@application/store/slices';
import LoadingPage from '@pages/loading-page';
import { AppRouter } from '@routing/app-router.tsx';

function App() {
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

  return isAuthenticated ? <AppRouter /> : <LoadingPage />;
}

export default App;
