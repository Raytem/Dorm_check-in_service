import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@application/store';
import { isUserAuthenticated } from '@application/store/slices';
import { AppRoutes } from '@routing/app-routes.ts';

export interface AppProps {
    children?: React.ReactNode;
}

function App({ children = <></> }: AppProps) {
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector(isUserAuthenticated)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(AppRoutes.LOGIN)
        }
    }, [isAuthenticated, navigate]);

    return children
}

export default App
