import { ElementRowTable } from "@components/table/models/table.model";
import { IElementRowTable } from "@components/table/interfaces/table.interface";

export class ChargeHelper {
  static columnsTable: IElementRowTable[] =  [
    new ElementRowTable('name','Nombre'),
    new ElementRowTable('areaName','Área'),
    new ElementRowTable('hierarchyName','Jerarquía'),
    new ElementRowTable('actions','Acciones'),
  ];

  static titleActionText = {
    list: 'Listado de Cargos',
    modalCreate: 'Crear Cargo',
    modalUdpate:  'Editar Cargo'
  }
}
