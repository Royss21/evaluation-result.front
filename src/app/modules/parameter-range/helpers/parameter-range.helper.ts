import { IElementRowTable } from "@components/table/interfaces/table.interface";
import { ElementRowTable } from "@components/table/models/table.model";

export class ParameterRangeHelper{
    static columnsTable: IElementRowTable[] =  [
      new ElementRowTable('name','Nombre'),
      new ElementRowTable('description','Descripción'),
      new ElementRowTable('actions','Acciones', true),
    ];
}

export class ParameterRangeText{

  static modalCreate = 'Crear Rango de Parametro';
  static modalUdpate =  'Editar Rango de Parametro';
} 