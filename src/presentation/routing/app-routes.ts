export enum AppRoutes {
	HOME = '/',
	LOGIN = '/auth/login',
	ROOMS = '/rooms',
	ROOM = '/rooms/:roomId',
	CHECK_IN_CONFIRMATION = '/check-in-confirmation',
	POPULATED_STATISTICS = '/populated-statistics',
}

export interface AppRoutesParams {
	[AppRoutes.ROOM]: {
		roomId: string;
	};
}

export namespace AppRoutes {
	export function getPath<R extends keyof AppRoutesParams>(
		route: R,
		pathParams: AppRoutesParams[R]
	): string;

	export function getPath<R extends Exclude<AppRoutes, keyof AppRoutesParams>>(
		route: R
	): string;

	export function getPath<R extends AppRoutes>(
		route: R,
		pathParams?: R extends keyof AppRoutesParams ? AppRoutesParams[R] : never
	): string {
		let path = route.toString();

		if (!pathParams) return path;

		for (const param in pathParams) {
			const pathParamKey = `:${String(param)}`
			const paramStringValue = String(pathParams[param] );

			path = path.replace(pathParamKey, paramStringValue);
		}

		return path;
	}
}