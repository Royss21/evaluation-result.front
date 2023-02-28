import { IPaginatedFilter } from "@components/table/interfaces/paginated-filter.interface";

export interface IProgressExamReport {
  evaluationCollaboratorId: string;
  evaluationId: string;
  resultObjectiveCorporate: number;
  resultObjectiveArea: number;
  resultCompetence: number;
  statusObjectiveCorporateId: number;
  statusObjectiveAreaId: number;
  statusCompetenceId: number;
  stageCurrentId: number;
}

export interface IProgressExamPaginatedFilter extends IPaginatedFilter {

}
