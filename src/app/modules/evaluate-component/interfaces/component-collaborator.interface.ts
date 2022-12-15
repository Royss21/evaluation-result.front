
export interface IComponentCollaborator{

  id: string;
  evaluationComponentId: number,
  evaluationComponentStageId: number,
  stageId: number
  componentId: number,
  componentCollaboratorDetails: IComponentCollaboratorDetail[]
 
}

export interface IComponentCollaboratorDetail{

  id: number;
  subComponentName: string,
  componentCollaboratorConducts: IComponentCollaboratorConduct[]
}

export interface IComponentCollaboratorConduct{

  id: number;
  conductDescription: string
}