import { ICollaboratorInformation } from "../../../core/interfaces/collaborator-information.interface";

export interface IComponentCollaboratorPaged extends ICollaboratorInformation{

  id:string;
  collaboratorId:string;
  documentNumber:string;
  statusId: number;
}
