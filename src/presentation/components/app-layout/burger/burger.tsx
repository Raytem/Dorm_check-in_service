import React from 'react';
import {
  ActionIcon,
  ActionIconProps,
  Burger as MantineBurger,
} from '@mantine/core';

export interface BurgerProps extends ActionIconProps {
  opened: boolean;
  onClick: () => void;
}

const Burger: React.FC<BurgerProps> = ({ opened, onClick, ...props }) => {
  return (
    <ActionIcon
      hiddenFrom="sm"
      size={'lg'}
      bg={'main.7'}
      variant={'light'}
      onClick={onClick}
      {...props}
    >
      <MantineBurger color={'white'} opened={opened} size="sm" />
    </ActionIcon>
  );
};

export default Burger;
