import React, { useEffect } from 'react';
import { useInjection } from 'inversify-react';
import { IAuthService } from '@domain/adapters/services/auth-service';
import { Role } from '@domain/enums';

export interface AppProps {
  children?: React.ReactNode;
}

function App({ children = <></> }: AppProps) {
  const authService = useInjection(IAuthService.$);

  useEffect(() => {
    (async () => {
      const isAuthenticated = await authService.checkAuthorization([
        Role.ROLE_CIT,
        Role.ROLE_DEPUTY_DEAN,
        Role.ROLE_HOSTEL,
      ]);
      // const isAuthenticated = true; // TODO: delete mock

      if (!isAuthenticated) {
        authService.redirectToLogin();
        return;
      }
    })();
  }, []);

  return children;
}

export default App;
