import React from 'react';
import { ActionIcon, Tooltip, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

export interface ThemeButtonProps {
  className?: string;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ className = '' }) => {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <Tooltip label={colorScheme === 'dark' ? 'Светлая тема' : 'Темная тема'}>
      <ActionIcon
        className={className}
        onClick={toggleColorScheme}
        variant={'filled'}
        color={'main.7'}
        size={'lg'}
      >
        {colorScheme === 'dark' ? <IconSun /> : <IconMoon />}
      </ActionIcon>
    </Tooltip>
  );
};

export default ThemeButton;
