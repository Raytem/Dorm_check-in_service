import { SortDirection } from '@domain/enums';

export class SortParamsEntity<S> {
	constructor(
		public sortBy?: S,
		public sortDir?: SortDirection,
	) {}
}