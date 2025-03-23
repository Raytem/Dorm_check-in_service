import React from "react";
import { Navigate } from "react-router-dom";
import ForbiddenPage from "@pages/forbidden";
import { useAppSelector } from '@application/store';
import { isUserAuthenticated, selectAuthenticatedUser } from '@application/store/slices';
import { AppRoutes } from '@routing/app-routes.ts';

export interface RouteGuardProps {
    allowedRoles?: string[]
    redirectTo?: string
    children?: React.ReactNode
}

export const RouteGuard = ({
    allowedRoles = [],
    redirectTo = AppRoutes.LOGIN,
    children,
}: RouteGuardProps) => {
    const isAuthenticated = useAppSelector(isUserAuthenticated)
    const { authenticatedUser } = useAppSelector(selectAuthenticatedUser)
    const userRoles = authenticatedUser?.roles ?? []

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />
    }

    if (
        allowedRoles?.length &&
        !userRoles?.some((role) => allowedRoles?.includes(role))
    ) {
        return <ForbiddenPage />
    }

    return <>{children}</>
}