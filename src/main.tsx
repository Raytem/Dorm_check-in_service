import { lazy, StrictMode, Suspense } from 'react';
import { MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Provider as DIProvider } from 'inversify-react'
import { Provider as StoreProvider } from 'react-redux'

import { ApplicationRoutes } from "@routing/application.routes.tsx";
import LoadingPage from "presentation/pages/loading-page";

import { store } from '@application/store';
import { diContainer } from '@/di';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { mantineTheme } from '@/mantine.theme.ts';
import './index.css'

const App = lazy(() => import('@/App.tsx'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={mantineTheme} defaultColorScheme={'auto'}>
        <Notifications />
        <StoreProvider store={store}>
            <DIProvider container={diContainer}>
                <BrowserRouter>
                    <Suspense fallback={<LoadingPage />}>
                        <App />
                        <ApplicationRoutes />
                    </Suspense>
                </BrowserRouter>
            </DIProvider>
        </StoreProvider>
    </MantineProvider>
  </StrictMode>,
)
