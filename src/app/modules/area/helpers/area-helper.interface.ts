import { ElementRowTable } from "@components/table/models/table.model";
import { IElementRowTable } from "@components/table/interfaces/table.interface";

export class AreaHelper {
  static columnsTable: IElementRowTable[] =  [
    new ElementRowTable('name','Nombre'),
    new ElementRowTable('gerencyName','Gerencia'),
    new ElementRowTable('actions','Acciones'),
  ];

  static titleActionText = {
    list: 'Listado de Áreas',
    modalCreate: 'Crear Área',
    modalUpdate:  'Editar Área'
  }
}
