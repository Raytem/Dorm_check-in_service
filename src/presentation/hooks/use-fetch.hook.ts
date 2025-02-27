import { useCallback, useState } from 'react';

export const useFetch = <T, P = void>(callback: (params: P) => Promise<T> | T, initialIsLoading: boolean = false) => {
	const [isLoading, setIsLoading] = useState(initialIsLoading);
	const [error, setError] = useState<unknown | null>(null);
	const [data, setData] = useState<T | null>(null);

	const refetch = useCallback((params: P) => {
		(async () => {
			setIsLoading(true);
			setError(null);
			try {
				const result = await callback(params);
				setData(result);
			} catch (err) {
				setError(err);
			} finally {
				setIsLoading(false);
			}
		})()
	}, []);

	return {
		data,
		isLoading,
		error,
		refetch,
	};
};