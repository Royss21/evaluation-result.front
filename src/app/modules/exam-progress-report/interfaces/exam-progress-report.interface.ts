import { IPaginatedFilter } from "@components/table/interfaces/paginated-filter.interface";

export interface IProgressExamReport {
  collaboratorName: string;
  documentNumber: string;
  chargeName: string;
  areaName: string;
  gerencyName: string;
  hierarchyName: string;
  levelName: string;
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
  evaluationId: string;
}
