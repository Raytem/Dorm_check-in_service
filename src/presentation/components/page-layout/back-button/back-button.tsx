import React from 'react';
import { Button } from '@mantine/core';
import { To, useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

export interface BackButtonProps {
  title?: string;
  to?: To;
}

const BackButton: React.FC<BackButtonProps> = ({ title = 'Назад', to }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(to ?? (-1 as To));
  };

  return (
    <Button
      variant={'transparent'}
      pl={0}
      leftSection={<IconArrowLeft />}
      style={{ alignSelf: 'flex-start' }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default BackButton;
