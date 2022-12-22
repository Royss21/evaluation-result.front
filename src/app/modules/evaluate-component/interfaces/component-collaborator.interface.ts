import { ICollaboratorInformation } from "./collaborator-information.interface";

export interface IComponentCollaborator extends ICollaboratorInformation{

  id: string;
  evaluationComponentId: number,
  evaluationComponentStageId: number,
  stageId: number
  componentId: number,
  comment: string;
  statusName: string;
  statusId: number;
  componentCollaboratorDetails: IComponentCollaboratorDetail[]
}

export interface IComponentCollaboratorDetail{

  id: number;
  subcomponentName: string,
  valueResult: number,
  minimunPercentage: number,
  maximunPercentage: number,
  componentCollaboratorConducts: IComponentCollaboratorConduct[]
}


export interface IComponentCollaboratorConduct{

  id: number;
  pointValue: 0;
  conductDescription: string;
  isSelected: boolean;
}