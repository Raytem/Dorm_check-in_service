import { useRoutes } from 'react-router-dom';
import NotFoundPage from "@pages/not-found";
import { RouteGuard } from '@presentation/hocs';
import { lazy } from 'react';
import AppLayout from 'presentation/layouts/app-layout';

const Dormitories = lazy(() => import('@pages/dormitories'));
const Login = lazy(() => import('@pages/login'));

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
                    path: 'dormitories',
                    element: <RouteGuard allowedRoles={[]} children={<Dormitories />} />
                },
                {
                    path: 'check-in-confirmation',
                    element: <RouteGuard allowedRoles={[]} children={<Login />} />
                },
            ]
        },
        {
            path: '*',
            element: <NotFoundPage/>,
        }
    ])

    return routesElement
}