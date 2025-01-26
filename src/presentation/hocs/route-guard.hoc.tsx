import React from "react";
import { Navigate } from "react-router-dom";
import { AppRoutes } from "@routing/app-routes.enum"
import ForbiddenPage from "@pages/forbidden";

export interface RouteGuardProps {
    isAuthenticated: boolean
    userRoles?: string[]
    allowedRoles?: string[]
    redirectTo?: string
    children?: React.ReactNode
}

export const RouteGuardHoc = ({
    isAuthenticated,
    userRoles = [],
    allowedRoles = [],
    redirectTo = AppRoutes.LOGIN,
    children,
}: RouteGuardProps) => {
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