import { useRoutes } from 'react-router-dom';
import NotFoundPage from "@pages/not-found";
import { RouteGuard } from '@presentation/hocs';
import { lazy } from 'react';
import AppLayout from 'presentation/layouts/app-layout';

const Rooms = lazy(() => import('@pages/rooms/rooms.page.tsx'));
const Room = lazy(() => import('@pages/room'));
const Login = lazy(() => import('@pages/login'));
const CheckInConfirmation = lazy(() => import('@pages/check-in-confirmation'));
const PopulatedStatistics = lazy(() => import('@pages/populated-statistics'));

export const ApplicationRoutes = () => {
    const routesElement = useRoutes([
        {
            path: '/',
            element: <AppLayout />,
            children: [
                {
                    path: 'auth/login',
                    element: <Login/>,
                },
                {
                    path: 'rooms',
                    children: [
                        {
                            index: true,
                            element: <RouteGuard allowedRoles={[]} children={<Rooms />} />
                        },
                        {
                            path: ':roomId',
                            element: <RouteGuard allowedRoles={[]} children={<Room />} />
                        }
                    ]
                },
                {
                    path: 'check-in-confirmation',
                    element: <RouteGuard allowedRoles={[]} children={<CheckInConfirmation />} />
                },
                {
                    path: 'populated-statistics',
                    element: <RouteGuard allowedRoles={[]} children={<PopulatedStatistics />} />
                }
            ]
        },
        {
            path: '*',
            element: <NotFoundPage/>,
        }
    ])

    return routesElement
}