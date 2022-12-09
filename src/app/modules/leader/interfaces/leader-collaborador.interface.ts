export interface ILeaderCollaborator{
  collaboratorName: string; 
  documentNumber: string; 
  StagesName: string[]; 
  areaName: string;
}

export interface ILeaderCollaboratorAssigned{
  collaborators: ILeaderCollaborator[],
  countTotal: number
}