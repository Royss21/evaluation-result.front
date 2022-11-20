import { IElementRowTable } from "@components/table/interfaces/table.interface";
import { ElementRowTable } from "@components/table/models/table.model";

export class ParameterValueHelper{
    static columnsTable: IElementRowTable[] =  [
      new ElementRowTable('name','Nombre'),
      new ElementRowTable('value','Valor'),
      new ElementRowTable('actions','Acciones', true),
    ];
}
