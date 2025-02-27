export enum SortDirection {
	ASC = 'asc',
	DESC = 'desc',
}

export namespace SortDirection {
	export function getChangedDirection(curDirection: SortDirection) {
		return curDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
	}
}