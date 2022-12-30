import { ElementRowTable } from "@components/table/models/table.model";
import { IElementRowTable } from "@components/table/interfaces/table.interface";

export class HierarchyHelper{
  static columnsTable: IElementRowTable[] =  [
    new ElementRowTable('id','#'),
    new ElementRowTable('name','Nombre'),
    new ElementRowTable('levelName','Nivel'),
    new ElementRowTable('actions','Acciones'),
  ];

  static titleActionText = {
    list: 'Listado de jerarquías',
    modalCreate: 'Crear Jerarquía',
    modalUpdate: 'Editar Jerarquía'
  }
}
