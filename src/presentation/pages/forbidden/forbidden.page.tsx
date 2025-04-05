import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Center, Stack, Text, Title } from '@mantine/core';
import { AppRoutes } from '@routing/app-routes.ts';

const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate();

  const handleToMainPageBtnClick = () => {
    navigate(AppRoutes.HOME);
  };

  return (
    <Center maw={'100%'} h={'100dvh'}>
      <Stack gap={10} maw={300} align={'center'}>
        <Title order={1}>403</Title>
        <Title order={2}>Не достаточно прав</Title>

        <Text size={'lg'} ta={'center'} mb={'xl'}>
          У вас нет прав для простомтра данной страницы
        </Text>

        <Button size={'md'} onClick={handleToMainPageBtnClick}>
          На главную
        </Button>
      </Stack>
    </Center>
  );
};

export default ForbiddenPage;
