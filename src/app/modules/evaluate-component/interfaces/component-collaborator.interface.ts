
export interface IComponentCollaborator{

  id: string;
  evaluationComponentId: number,
  evaluationComponentStageId: number,
  stageId: number
  componentId: number,
  comment: string;
  componentCollaboratorDetails: IComponentCollaboratorDetail[]
}

export interface IComponentCollaboratorDetail{

  id: number;
  subcomponentName: string,
  valueResult: 0,
  minimunPercentage: number,
  maximunPercentage: number,
  componentCollaboratorConducts: IComponentCollaboratorConduct[]
}

export interface IComponentCollaboratorConduct{

  id: number;
  pointValue: 0,
  conductDescription: string
}