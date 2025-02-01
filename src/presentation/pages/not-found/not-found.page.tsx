import { useNavigate } from "react-router-dom";
import { Button, Center, Stack, Title } from "@mantine/core";

const NotFoundPage = () => {
    const navigate = useNavigate()

    const handleToMainPageBtnClick = () => {
        navigate('/')
    }

    return <Center maw={'100%'} h={'100dvh'}>
        <Stack gap={10} maw={300} align={'center'}>
            <Title order={1}>404</Title>
            <Title order={2} mb={'xl'}>Страница не найдена</Title>

            <Button size={'md'} onClick={handleToMainPageBtnClick}>
                На главную
            </Button>
        </Stack>
    </Center>
}

export default NotFoundPage;