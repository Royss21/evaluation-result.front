import { IComponentCollaboratorConduct } from "./component-collaborator.interface";



export interface IComponentCollaboratorEvaluate{

  id: string;
  evaluationComponentId: number,
  evaluationComponentStageId: number,
  stageId: number
  componentId: number,
  comment: string;
  componentCollaboratorDetailsEvaluate: IComponentCollaboratorDetailEvaluate[]
}

export interface IComponentCollaboratorDetailEvaluate{

  id: number;
  subcomponentName: string,
  valueResult: number,
  minimunPercentage: number,
  maximunPercentage: number,
  componentCollaboratorConductsEvaluate: IComponentCollaboratorConduct[]
}