import { ICollaboratorInformation } from '@core/interfaces/collaborator-information.interface';

export interface IResultEvaluationCollaborator
  extends ICollaboratorInformation {
  id: string;
  evaluationId: string;
  evaluationComponentStageId: number;
  componentCollaboratorCommentId: number;
  stageId: number;
  statusName: string;
  feedbackComment: string;
  approvalComment: string;
  resultComponents: IResultComponentCollaborator[];
}

export interface IResultComponentCollaborator {
  componentId: number;
  evaluationComponentId: number;
  evaluationComment: string;
  calibrationComment: string;
  weightHierarchy: number;
  subTotal: number;
  subTotalCalibrated: number;
  excessSubtotal: number;
  complianceCompetence: number;
  complianceCompetenceCalibrated: number;
  total: number;
  totalCalibrated: number;
  excess: number;
  resultObjectives: IResultComponentCollaboratorDetail[];
}

export interface IResultComponentCollaboratorDetail {
  subcomponentName: string;
  weightRelative: number;
  minimunPercentage: number;
  maximunPercentage: number;
  result: number;
  compliance: number;
  points: number;
  pointsCalibrated: number;
  resultConducts: IResultComponentCollaboratorConduct[];
}

export interface IResultComponentCollaboratorConduct {
  conductDescription: string;
  conductPoints: number;
  conductPointsCalibrated: number;
}
