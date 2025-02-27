export interface PaginatedData<T> {
	data: T[],
	totalItems: number,
	totalPages: number,
	limit: number,
	currentPage: number,
}