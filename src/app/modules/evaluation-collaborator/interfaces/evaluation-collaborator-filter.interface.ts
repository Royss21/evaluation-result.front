import { IPaginatedFilter } from "@components/table/interfaces/paginated-filter.interface";

export interface IEvaluationCollaboratorFilter extends IPaginatedFilter{

  evaluationId: string;
}