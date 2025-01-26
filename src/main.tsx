import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Provider as DIProvider } from 'inversify-react'
import { Provider as StoreProvider } from 'react-redux'

import { ApplicationRoutes } from "@routing/application.routes.tsx";
import LoadingPage from "presentation/pages/loading-page";

import { store } from '@application/store';
import { diContainer } from '@/di';

import '@mantine/core/styles.css';
import './index.css'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme={'auto'}>
        <StoreProvider store={store}>
            <DIProvider container={diContainer}>
                <BrowserRouter>
                    <Suspense fallback={<LoadingPage />}>
                        <ApplicationRoutes />
                    </Suspense>
                </BrowserRouter>
            </DIProvider>
        </StoreProvider>
    </MantineProvider>
  </StrictMode>,
)
