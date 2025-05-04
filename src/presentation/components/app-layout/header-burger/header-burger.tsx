import React from 'react';
import {
  ActionIcon,
  ActionIconProps,
  Burger as MantineBurger,
} from '@mantine/core';

export interface HeaderBurgerProps extends ActionIconProps {
  opened: boolean;
  onClick: () => void;
}

const HeaderBurger: React.FC<HeaderBurgerProps> = ({
  opened,
  onClick,
  ...props
}) => {
  return (
    <ActionIcon
      hiddenFrom="sm"
      size={'lg'}
      bg={'main.7'}
      variant={'light'}
      onClick={onClick}
      {...props}
    >
      <MantineBurger
        component={'div'}
        color={'white'}
        opened={opened}
        size="sm"
        mt={'50%'}
      />
    </ActionIcon>
  );
};

export default HeaderBurger;
