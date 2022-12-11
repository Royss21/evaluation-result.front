import { IEvaluationCollaborator } from "./evaluation-collaborator.interfaces";

export interface IEvaluationCollaboratorPaged extends IEvaluationCollaborator{

  id:string ;
  collaboratorName: string; 
  documentNumber: string;
  isLeaderCompetencies: boolean; 
  isLeaderAreaObjectives: boolean;
}