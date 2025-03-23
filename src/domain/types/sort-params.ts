import { SortDirection } from '@domain/enums';

export interface SortParams<S> {
	sortBy?: S,
	sortDir?: SortDirection,
}