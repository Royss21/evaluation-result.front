import { IPaginatedFilter } from "@components/table/interfaces/paginated-filter.interface";

export interface IComponentCollaboratorFilter extends IPaginatedFilter{
  evaluationId: string;
  componentId: number;
}