import React from 'react';
import {
  ActionIcon,
  BoxProps,
  Burger as MantineBurger,
  useMantineColorScheme,
} from '@mantine/core';

export interface NavbarBurgerProps extends BoxProps {
  opened: boolean;
  onClick: () => void;
}

const NavbarBurger: React.FC<NavbarBurgerProps> = ({
  opened = false,
  onClick = () => {},
  ...props
}) => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <ActionIcon variant={'default'} size={'xl'} onClick={onClick} {...props}>
      <MantineBurger
        component={'div'}
        color={colorScheme === 'dark' ? 'white' : 'main.6'}
        opened={opened}
        mt={'50%'}
      />
    </ActionIcon>
  );
};

export default NavbarBurger;
