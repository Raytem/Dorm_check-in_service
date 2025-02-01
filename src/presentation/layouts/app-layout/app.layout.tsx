import React from 'react';
import {
    AppShell,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Header from '@layouts/app-layout/components/header';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@application/store';
import { isUserAuthenticated } from '@application/store/slices';
import Navbar from './components/navbar';


const AppLayout: React.FC = () => {
    const [opened, { toggle }] = useDisclosure();
    const isAuthenticated = useAppSelector(isUserAuthenticated);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    return <AppShell
        header={{
            height: {
                base: 140,
                xs: 70
            },
        }}
        navbar={
            isAuthenticated ? {
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            } : undefined
        }
        padding="md"
    >
       <Header
           burgerOpened={opened}
           toggleBurger={toggle}
       />

        <Navbar onLinkClick={toggle} />

        <AppShell.Main>
            <Outlet/>
        </AppShell.Main>

    </AppShell>
}

export default AppLayout