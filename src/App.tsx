import './App.css'
import { Link } from "react-router-dom";
import { AppRoutes } from "@routing/app-routes.enum";
import { Button, Stack, Text, useMantineColorScheme } from "@mantine/core";

function App() {
    const { toggleColorScheme } = useMantineColorScheme();

    return (
    <>
        <Button
            onClick={async () => {
                toggleColorScheme();
            }
        }>
            Toggle color scheme
        </Button>

        <Text size={'xl'}>Hello world</Text>
        <Stack align={'start'} gap={'sm'}>
            <Link to={AppRoutes.LOGIN}>Login</Link>
            <Link to={AppRoutes.DORM_ROOMS}>Dorm rooms</Link>
        </Stack>
    </>
    )
}

export default App
