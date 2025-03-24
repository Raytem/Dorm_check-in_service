import { useCallback, useEffect } from 'react';
import { NumberParam, useQueryParams, withDefault } from 'use-query-params';
import { PaginationFilter } from '@domain/types';

export function useQueryPagination(
	initialValue: PaginationFilter = {
		page: 1,
		limit: 20,
	},
	onPageChange: (page: number) => void
		= () => {},
	onLimitChange: (limit: number) => void
		= () => {},
) {
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

	useEffect(() => {
		onPageChange(query.page);
	}, [query.page]);

	useEffect(() => {
		onLimitChange(query.limit);
	}, [query.limit]);

	return {
		page: query.page,
		limit: query.limit,
		setPage,
		setLimit,
	}
}