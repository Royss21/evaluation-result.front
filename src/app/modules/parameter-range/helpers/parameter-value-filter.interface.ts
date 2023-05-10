import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';

export interface IParameterValueFilter extends IPaginatedFilter {
  parameterRangeId: string;
}
