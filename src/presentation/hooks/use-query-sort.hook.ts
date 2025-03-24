import { useCallback, useEffect } from 'react';
import { StringParam, useQueryParams, withDefault } from 'use-query-params';
import { SortParams } from '@domain/types/sort-params.ts';

export function useQuerySort<T extends string>(
	onSortChange: (sort: SortParams<T>) => void = () => {},
	initialValue?: SortParams<T>,
) {
	const [query, setQuery] = useQueryParams({
		sortBy: withDefault(StringParam, initialValue?.sortBy),
		sortDir: withDefault(StringParam, initialValue?.sortDir),
	});

	const setSort = useCallback(
		(sortBy: T, sortDir: SortParams<T>['sortDir']) => {
			const newSort: SortParams<T> = { sortBy, sortDir };
			setQuery(newSort);
		},
		[]
	);

	useEffect(() => {
		onSortChange(query as SortParams<T>);
	}, [query]);

	return {
		sort: query as SortParams<T>,
		setSort,
	};
}