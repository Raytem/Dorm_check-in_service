import React, { useEffect } from 'react';
import {
    AppShell, Overlay, Transition, useMatches,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Header from '@layouts/app-layout/components/header';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@application/store';
import { isUserAuthenticated } from '@application/store/slices';
import Navbar from './components/navbar';
import { useBodyOverflow } from '@presentation/hooks';


const AppLayout: React.FC = () => {
    const isAuthenticated = useAppSelector(isUserAuthenticated);
    const [isNavbarCollapsed, { toggle: toggleNavbarCollapsed }] = useDisclosure(true);
    const [opened, { toggle }] = useDisclosure();
    const { toggleOverflow } = useBodyOverflow()

    useEffect(() => {
        toggleOverflow(!isNavbarCollapsed)
    }, [isNavbarCollapsed]);

    const headerHeight = useMatches({
        base: 140,
        xs: 70,
    })

    const isMobile = useMatches({
        base: false,
        sm: true
    })

    return <AppShell
        header={{
            height: headerHeight,
        }}
        navbar={
            isAuthenticated ? {
                width: {
                    xs: 80,
                    md: 130
                },
                breakpoint: 'sm',
                collapsed: {
                    mobile: !opened,
                },
            } : undefined
        }
        padding="md"
    >

        <Header
            burgerOpened={opened}
            toggleBurger={toggle}
        />

        {isAuthenticated && (
            <Navbar
                headerHeight={headerHeight}
                onMobileLinkClick={toggle}
                isNavbarCollapsed={isNavbarCollapsed}
                toggleNavbarCollapsed={toggleNavbarCollapsed}
                isMobile={isMobile}
            />
        )}

        <AppShell.Main className={'appContainer'}>
            <Outlet />
        </AppShell.Main>


        {/* navbar overlay */}
        <Transition
            mounted={isMobile && !isNavbarCollapsed}
            transition="fade"
            timingFunction="ease"
        >
            {(styles) => (
                <Overlay
                    top={headerHeight}
                    style={{ ...styles, position: 'fixed' }}
                    onClick={toggleNavbarCollapsed}
                />
            )}
        </Transition>
    </AppShell>
}

export default AppLayout