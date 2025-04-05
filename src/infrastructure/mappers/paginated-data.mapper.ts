import { PaginatedData } from '@domain/types';

export interface BasePaginationData {
  page: number;
  limit: number;
  totalItems: number;
}

export class PaginatedDataMapper {
  static toDomain<T>(
    paginationData: BasePaginationData,
    dataMapperFuc: () => T[],
  ): PaginatedData<T> {
    const curPage = paginationData.page + 1;
    const totalPages =
      paginationData.totalItems /
      (paginationData.limit <= 0 ? 1 : paginationData.limit);

    return {
      totalItems: paginationData.totalItems,
      totalPages,
      limit: paginationData.limit,
      currentPage: curPage,
      data: dataMapperFuc(),
    };
  }
}
