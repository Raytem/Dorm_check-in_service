import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@application/store';
import { isUserAuthenticated } from '@application/store/slices';

export interface AppProps {
    children?: React.ReactNode;
}

function App({ children = <></> }: AppProps) {
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector(isUserAuthenticated)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('auth/login')
        }
    }, [isAuthenticated, navigate]);

    return children
}

export default App
