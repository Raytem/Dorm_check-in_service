import { Route, Routes } from "react-router-dom";
import { routesConfig } from "@routing/routes.config.tsx";
import NotFoundPage from "@pages/not-found";
import { RouteGuardHoc } from '../hocs';

import { useAppSelector } from '@application/store';
import { isUserAuthenticated, selectAuthenticatedUser } from '@application/store/slices';


export const ApplicationRoutes = () => {
    const isAuthenticated = useAppSelector(isUserAuthenticated)

    const { authenticatedUser } = useAppSelector(selectAuthenticatedUser)
    const userRoles = authenticatedUser?.roles ?? []

    return <Routes>
        {
            routesConfig.map((route, idx) => {
                return <Route
                    key={idx}
                    path={route.path}
                    element={
                        route.isProtected
                            ? <RouteGuardHoc
                                isAuthenticated={isAuthenticated}
                                userRoles={userRoles}
                                allowedRoles={route.allowedRoles ?? []}
                            >
                                { route.element }
                            </RouteGuardHoc>
                            : route.element
                    }
                />
            })
        }
        <Route path={'*'} element={<NotFoundPage/>} />
    </Routes>
}