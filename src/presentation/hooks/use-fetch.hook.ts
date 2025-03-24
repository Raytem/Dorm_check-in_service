import { useCallback, useState } from 'react';

export const useFetch = <T, Args extends unknown[]>(
	callback: (...args: Args) => Promise<T> | T,
	initialIsLoading: boolean = false
) => {
	const [isLoading, setIsLoading] = useState(initialIsLoading);
	const [error, setError] = useState<unknown | null>(null);
	const [data, setData] = useState<T | null>(null);

	const refetch = useCallback(
		(showLoadingState: boolean = true, ...args: Args) => {
			(async () => {
				if (showLoadingState) {
					setIsLoading(true);
				}

				setError(null);
				try {
					const result = await callback(...args);
					setData(result);
				} catch (err) {
					setError(err);
				} finally {
					setIsLoading(false);
				}
			})();
		},
		[]
	);

	return {
		data,
		isLoading,
		error,
		refetch,
		setData,
	};
};