import { useRoutes } from 'react-router-dom';
import NotFoundPage from '@pages/not-found';
import { RouteGuard } from '@presentation/hocs';
import React, { lazy } from 'react';
import AppLayout from 'presentation/layouts/app';
import { AppRoutes } from '@routing/app-routes.ts';

const Rooms = lazy(() => import('@pages/rooms/rooms.page.tsx'));
const Room = lazy(() => import('@pages/room'));
const Login = lazy(() => import('@pages/login'));
const CheckInConfirmation = lazy(() => import('@pages/check-in-confirmation'));
const PopulatedStatistics = lazy(() => import('@pages/populated-statistics'));

export const AppRouter: React.FC = () => {
  const routesElement = useRoutes([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          path: AppRoutes.LOGIN,
          element: <Login />,
        },
        {
          path: AppRoutes.ROOMS,
          children: [
            {
              index: true,
              element: <RouteGuard allowedRoles={[]} children={<Rooms />} />,
            },
            {
              path: AppRoutes.ROOM,
              element: <RouteGuard allowedRoles={[]} children={<Room />} />,
            },
          ],
        },
        {
          path: AppRoutes.CHECK_IN_CONFIRMATION,
          element: (
            <RouteGuard allowedRoles={[]} children={<CheckInConfirmation />} />
          ),
        },
        {
          path: AppRoutes.POPULATED_STATISTICS,
          element: (
            <RouteGuard allowedRoles={[]} children={<PopulatedStatistics />} />
          ),
        },
      ],
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  return routesElement;
};
