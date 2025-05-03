import { PaginationFilter } from '@domain/types/pagination-filter.ts';

export interface GetCandidatesForRoomFilters extends PaginationFilter {
  fullName?: string;
  groupName?: string;
  gradeBookNumber?: string;
  facultyName?: string;
}
