import { useCallback } from 'react';
import { StringParam, useQueryParams, withDefault } from 'use-query-params';
import { SortParams } from '@domain/types/sort-params.ts';

export function useQuerySort<T extends string>(initialValue?: SortParams<T>) {
  const [query, setQuery] = useQueryParams({
    sortBy: withDefault(StringParam, initialValue?.sortBy),
    sortDir: withDefault(StringParam, initialValue?.sortDir),
  });

  const setSort = useCallback(
    (sortBy: T, sortDir: SortParams<T>['sortDir']) => {
      const newSort: SortParams<T> = { sortBy, sortDir };
      setQuery(newSort);
    },
    [],
  );

  return {
    sort: query as SortParams<T>,
    setSort,
  };
}
