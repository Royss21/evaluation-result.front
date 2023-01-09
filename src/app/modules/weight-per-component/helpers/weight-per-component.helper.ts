import { ElementRowTable } from "@components/table/models/table.model";
import { IElementRowTable } from "@components/table/interfaces/table.interface";

export class WeightPerComponentHelper{
  static columnsTable: IElementRowTable[] =  [
    new ElementRowTable('hierarchyName','Nombre'),
    new ElementRowTable('actions','Acciones')
  ];

  static titleActionText = {
    list: 'Jerarquías',
    modalCreate: 'Asignar pesos por componente',
    modalUpdate:  'Editar Peso por componente'
  }
}
