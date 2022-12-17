import { ICollaboratorInformation } from "./collaborator-information.interface";

export interface IComponentCollaboratorPaged extends ICollaboratorInformation{
  
  id:string;
  collaboratorId:string;
  documentNumber:string; 
  statusId: number;
}