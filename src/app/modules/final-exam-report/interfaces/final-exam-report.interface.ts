import { IPaginatedFilter } from "@components/table/interfaces/paginated-filter.interface";

export interface IFinalExamReport {
  collaboratorName: string;
  documentNumber: string;
  gerencyName: string;
  areaName: string;
  chargeName: string;
  hierarchyName: string;
  levelName: string;
  evaluationId: string;
  finalResult: string;
  resultLabel: string;
}

export interface IFinalExamPaginatedFilter extends IPaginatedFilter {

}
