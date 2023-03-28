import { IElementRowTable } from "@components/table/interfaces/table.interface";
import { ElementRowTable } from "@components/table/models/table.model";

export class RoleHelper{
  static columnsTable: IElementRowTable[] =  [
    new ElementRowTable('id','#'),
    new ElementRowTable('name','Nombre'),
    new ElementRowTable('actions','Acciones', true)
  ];

  static titleActionText = {
    list: 'Listado de roles',
    modalCreate: 'Crear Rol',
    modalUpdate: 'Editar Rol'
  }
}
