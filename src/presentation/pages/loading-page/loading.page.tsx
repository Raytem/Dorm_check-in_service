import { Center, Loader } from "@mantine/core";

const LoadingPage = () => {
    return <Center maw={'100%'} h={'100dvh'}>
        <Loader size={'xl'} type={'bars'} color={'main.6'}/>
    </Center>
}

export default LoadingPage;