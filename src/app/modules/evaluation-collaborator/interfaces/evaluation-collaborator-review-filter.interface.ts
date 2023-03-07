import { IPaginatedFilter } from "@components/table/interfaces/paginated-filter.interface";

export interface IEvaluationCollaboratorReviewFilter extends IPaginatedFilter{

  stageId: number;
  evaluationId: string;
  evaluationCollaboratorId: string | null;
}
