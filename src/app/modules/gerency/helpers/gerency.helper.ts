import { IElementRowTable } from "@components/table/interfaces/table.interface";
import { ElementRowTable } from "@components/table/models/table.model";

export class GerencyHelper{
  static columnsTable: IElementRowTable[] =  [
    new ElementRowTable('name','Nombre'),
    new ElementRowTable('actions','Acciones'),
  ];

  static titleActionText = {
    list: 'Listado de gerencias',
    modalCreate: 'Crear Gerencia',
    modalUpdate: 'Editar Gerencia'
  }
}

