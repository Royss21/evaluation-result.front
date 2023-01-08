import { ElementRowTable } from "@components/table/models/table.model";
import { IElementRowTable } from "@components/table/interfaces/table.interface";

export class WeightPerComponentHelper{
  static columnsTable: IElementRowTable[] =  [
    new ElementRowTable('id','#'),
    new ElementRowTable('name','Nombre'),
    new ElementRowTable('startDate','Fecha de Inicio'),
    new ElementRowTable('endDate','Fecha de Fin'),
    new ElementRowTable('actions','Acciones')
  ];

  static titleActionText = {
    list: 'Listado de Pesos por componente',
    modalCreate: 'Crear Peso por componente',
    modalUdpate:  'Editar Peso por componente'
  }
}
