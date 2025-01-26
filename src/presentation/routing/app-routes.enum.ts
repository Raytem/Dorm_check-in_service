import { RouteParams } from "./route-params.interface.ts";

export enum AppRoutes {
    MAIN = '/',
    LOGIN = '/login',
    DORM_ROOMS = '/dorm-rooms',
    CONCRETE_DORM_ROOM = `${AppRoutes.DORM_ROOMS}/:id`,
}

export namespace AppRoutes {
    export function generatePath<Route extends keyof  RouteParams>(route: Route, params: RouteParams[Route] | null): string {
        if (typeof params !== 'object' || params === null || params === undefined) {
            return route
        }
        let path: string = route
        for (const [key, value] of Object.entries(params)) {
            path = path.replace(`:${key}`, value)
        }
        return path
    }
}

