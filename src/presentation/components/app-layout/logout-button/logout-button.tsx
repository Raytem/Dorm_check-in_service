import React from 'react';
import { Button, ButtonProps } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useAppDispatch } from '@application/store';
import { clearAuthenticatedUser } from '@application/store/slices';
import { useInjection } from 'inversify-react';
import { IUINotificationService } from '@domain/adapters/services/ui-notification';
import { IAuthService } from '@domain/adapters/services/auth-service';

export interface LogoutButtonProps extends ButtonProps {
  title?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  title = 'Выйти',
  className = '',
  ...props
}) => {
  const dispatch = useAppDispatch();
  const authService = useInjection(IAuthService.$);
  const uiNotificationService = useInjection(IUINotificationService.$);

  const handleClick = async () => {
    try {
      authService.logout();
      dispatch(clearAuthenticatedUser(null));
    } catch (e) {
      uiNotificationService.showError(e);
    }
  };

  return (
    <Button
      className={className}
      color={'main.7'}
      rightSection={<IconLogout />}
      onClick={handleClick}
      miw={'110px'}
      {...props}
    >
      {title}
    </Button>
  );
};

export default LogoutButton;
