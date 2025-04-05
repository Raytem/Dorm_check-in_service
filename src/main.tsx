import { lazy, StrictMode, Suspense } from 'react';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as DIProvider } from 'inversify-react';
import { Provider as StoreProvider } from 'react-redux';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import { AppRouter } from '@routing/app-router.tsx';
import LoadingPage from 'presentation/pages/loading-page';

import { store } from '@application/store';
import { diContainer } from '@/di';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { mantineTheme } from '@/mantine.theme.ts';
import './index.css';

const App = lazy(() => import('@/App.tsx'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DIProvider container={diContainer}>
      <MantineProvider theme={mantineTheme} defaultColorScheme={'auto'}>
        <ModalsProvider>
          <Notifications />
          <StoreProvider store={store}>
            <BrowserRouter>
              <QueryParamProvider adapter={ReactRouter6Adapter}>
                <Suspense fallback={<LoadingPage />}>
                  <App />
                  <AppRouter />
                </Suspense>
              </QueryParamProvider>
            </BrowserRouter>
          </StoreProvider>
        </ModalsProvider>
      </MantineProvider>
    </DIProvider>
  </StrictMode>,
);
