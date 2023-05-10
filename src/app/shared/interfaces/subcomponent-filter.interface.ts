import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';

export interface ISubcomponentFilter extends IPaginatedFilter {
  componentId: number;
}
