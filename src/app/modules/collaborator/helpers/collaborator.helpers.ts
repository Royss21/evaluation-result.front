import { IElementRowTable } from "@components/table/interfaces/table.interface";
import { ElementRowTable } from "@components/table/models/table.model";

export class CollaboratorHelper{
  static columnsTable: IElementRowTable[] =  [
    new ElementRowTable('name','Nombre'),
    new ElementRowTable('documentNumber','Nro. Documento'),
    new ElementRowTable('gerencyName','Gerencia'),
    new ElementRowTable('areaName','Área'),
    new ElementRowTable('chargeName','Cargo'),
    new ElementRowTable('actions','Acciones'),
  ];
}

export class CollaboratorText{
  static modalCreate = 'Crear Colaborador';
  static modalUdpate =  'Editar Colaborador';
}
