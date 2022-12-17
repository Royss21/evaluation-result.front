import { IElementRowTable } from "@components/table/interfaces/table.interface";
import { ElementRowTable } from "@components/table/models/table.model";

export class CollaboratorHelper{
  static columnsTable: IElementRowTable[] =  [
    new ElementRowTable('name','Nombre'),
    new ElementRowTable('documentNumber','Nro. Documento'),
    new ElementRowTable('areaName','Área'),
    new ElementRowTable('levelName','Nivel'),
    new ElementRowTable('actions','Acciones'),
  ];
}

// export interface ICollaboratorNotInEvaluation{
//   chargeName: string;
//   hierarchyName : string;
//   gerencyName : string;
//   areaName : string;
//   levelName : string;
//   documentNumber : string;
//   middleName : string;
//   name : string;
//   lastName : string;
//   id:string;
// }

export class CollaboratorText{
  static modalCreate = 'Crear Colaborador';
  static modalUdpate =  'Editar Colaborador';
}
