export interface IUpdateStatus {
  id?: string | null;
  statusId: number;
  evaluationComponentStageId?: number | null;
  evaluationCollaboratorId?: string | null;
  isUpdateComponent: boolean;
}
