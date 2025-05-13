import { useRoutes } from 'react-router-dom';
import NotFoundPage from '@pages/not-found';
import { RouteGuard } from '@presentation/hocs';
import React, { lazy } from 'react';
import AppLayout from 'presentation/layouts/app';
import { AppRoutes } from '@routing/app-routes.ts';
import { Role } from '@domain/enums';

const Rooms = lazy(() => import('@pages/rooms/rooms.page.tsx'));
const Room = lazy(() => import('@pages/room'));
const CheckInConfirmation = lazy(() => import('@pages/check-in-confirmation'));
const PopulatedStatistics = lazy(() => import('@pages/populated-statistics'));

export const AppRouter: React.FC = () => {
  return useRoutes([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          path: AppRoutes.ROOMS,
          children: [
            {
              index: true,
              element: (
                <RouteGuard
                  allowedRoles={[
                    Role.HOSTEL,
                    Role.CIT,
                    Role.DEPUTY_DEAN,
                    Role.STUDENT,
                  ]} // TODO: удалить STUDENT
                  children={<Rooms />}
                />
              ),
            },
            {
              path: AppRoutes.ROOM,
              element: (
                <RouteGuard
                  allowedRoles={[
                    Role.HOSTEL,
                    Role.CIT,
                    Role.DEPUTY_DEAN,
                    Role.STUDENT,
                  ]} // TODO: удалить STUDENT
                  children={<Room />}
                />
              ),
            },
          ],
        },
        {
          path: AppRoutes.CHECK_IN_CONFIRMATION,
          element: (
            <RouteGuard
              allowedRoles={[
                Role.HOSTEL,
                Role.CIT,
                Role.DEPUTY_DEAN,
                Role.STUDENT,
              ]} // TODO: удалить STUDENT
              children={<CheckInConfirmation />}
            />
          ),
        },
        {
          path: AppRoutes.POPULATED_STATISTICS,
          element: (
            <RouteGuard
              allowedRoles={[
                Role.HOSTEL,
                Role.CIT,
                Role.DEPUTY_DEAN,
                Role.STUDENT,
              ]} // TODO: удалить STUDENT
              children={<PopulatedStatistics />}
            />
          ),
        },
      ],
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);
};
