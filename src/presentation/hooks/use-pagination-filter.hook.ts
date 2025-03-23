import { useCallback } from 'react';
import { NumberParam, useQueryParams, withDefault } from 'use-query-params';
import { PaginationFilter } from '@domain/types';

export function usePaginationFilter(initialValue: PaginationFilter) {
	const [query, setQuery] = useQueryParams({
		page: withDefault(NumberParam, initialValue.page),
		limit: withDefault(NumberParam, initialValue.limit),
	})

	const setPage = useCallback((page: number) => {
		setQuery({ page })
	}, [])

	const setLimit = useCallback((limit: number) => {
		setQuery({ limit })
	}, [])

	return {
		page: query.page,
		limit: query.limit,
		setPage,
		setLimit,
	}
}