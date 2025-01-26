import { AppRoutes } from "./app-routes.enum.ts";

export interface RouteParams {
    [AppRoutes.LOGIN]: null
    [AppRoutes.DORM_ROOMS]: null
    [AppRoutes.CONCRETE_DORM_ROOM]: { id: string }
}