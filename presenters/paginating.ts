import { PaginatingResponse } from 'api/interfaces';

export interface Paginating {
  currentPage: number;
  limitValue: number;
  offsetValue: number;
  totalCount: number;
  totalPages: number;
  isLastPage: boolean;
}

export default class PaginatingPresenter {
  public static fromResponse(res: PaginatingResponse): Paginating {
    return {
      currentPage: res.current_page,
      limitValue: res.limit_value,
      offsetValue: res.offset_value,
      totalCount: res.total_count,
      totalPages: res.total_pages,
      isLastPage: res.is_last_page,
    };
  }
}
