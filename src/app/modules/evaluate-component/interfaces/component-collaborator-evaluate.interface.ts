
export interface IComponentCollaboratorEvaluate{

  ComponentCollaboratorId: string;
  evaluationComponentId: number,
  evaluationComponentStageId: number,
  stageId: number
  componentId: number,
  comment: string,
  componentCollaboratorDetailsEvaluate: IComponentCollaboratorDetailEvaluate[]
 
}

export interface IComponentCollaboratorDetailEvaluate{

  componentCollaboratorDetailId: number;
  valueResult: number,
  componentCollaboratorConductsEvaluate: IComponentCollaboratorConductEvaluate[]
}

export interface IComponentCollaboratorConductEvaluate{

  componentCollaboratorConductId: number;
  pointValue: number
}