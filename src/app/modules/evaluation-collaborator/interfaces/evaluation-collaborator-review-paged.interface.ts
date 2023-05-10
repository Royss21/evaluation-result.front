import { ICollaboratorInformation } from '@core/interfaces/collaborator-information.interface';

export interface IEvaluationCollaboratorReviewPaged
  extends ICollaboratorInformation {
  id: string;
  EvaluationId: string;
  CollaboratorId: string;
}
