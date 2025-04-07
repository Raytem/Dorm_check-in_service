import { useCallback, useState } from 'react';

export interface RefetchOptions<TParams> {
  showLoadingState?: boolean;
  params?: TParams;
}

export const useFetch = <TResponse, TParams = void>(
  callback: (params: TParams) => Promise<TResponse> | TResponse,
  initialIsLoading: boolean = false,
) => {
  const [isLoading, setIsLoading] = useState(initialIsLoading);
  const [error, setError] = useState<unknown | null>(null);
  const [data, setData] = useState<TResponse | null>(null);

  const refetch = useCallback(
    async ({
      showLoadingState = true,
      params,
    }: RefetchOptions<TParams> = {}) => {
      if (showLoadingState) {
        setIsLoading(true);
      }

      setError(null);
      try {
        const result = await callback(params as TParams);
        setData(result);
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [callback],
  );

  return {
    data,
    isLoading,
    error,
    refetch,
    setData,
  };
};
