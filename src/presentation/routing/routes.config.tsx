import React, { lazy } from "react";
import { AppRoutes } from "@routing/app-routes.enum.ts";

const Login = lazy(() => import('@pages/login'));
const Main = lazy(() => import('App'))

export interface RouteConfig {
    path: AppRoutes,
    element: React.ReactNode,
    isProtected: boolean;
    allowedRoles?: string[]
}

export const routesConfig: RouteConfig[] = [
    {
        path: AppRoutes.MAIN,
        element: <Main/>,
        isProtected: false
    },
    {
        path: AppRoutes.LOGIN,
        element: <Login/>,
        isProtected: false
    },
    {
        path: AppRoutes.DORM_ROOMS,
        element: <Login/>,
        isProtected: true,
        allowedRoles: ['admin']
    },
]