export class PaginationFilterEntity {
	constructor(
		public limit: number = 20,
		public  page: number = 1,
	) {
	}
}