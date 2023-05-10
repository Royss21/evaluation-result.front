export interface ILeaderCollaborator {
  collaboratorName: string;
  documentNumber: string;
  stagesName: string[];
  areaName: string;
}

export interface ILeaderCollaboratorAssigned {
  collaborators: ILeaderCollaborator[];
  countTotal: number;
}
