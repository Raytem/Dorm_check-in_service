import { Button, Center, Stack, Text, Title } from '@mantine/core';
import React from 'react';

export interface StatusModalProps {
  icon?: React.ReactNode;
  title: string;
  body?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const StatusModal: React.FC<StatusModalProps> = ({
  icon,
  title,
  body,
  buttonText = 'Ок',
  onButtonClick = () => {},
}) => {
  return (
    <Center>
      <Stack align={'center'} style={{ textAlign: 'center' }}>
        {icon && icon}

        <Title order={4}>{title}</Title>

        {body && <Text>{body}</Text>}

        <Button miw={'50%'} onClick={onButtonClick}>
          {buttonText}
        </Button>
      </Stack>
    </Center>
  );
};

export default StatusModal;
