import { IElementRowTable } from "@components/table/interfaces/table.interface";
import { ElementRowTable } from "@components/table/models/table.model";

export class FormulaHelper{
    static columnsTable: IElementRowTable[] =  [
      new ElementRowTable('name','Nombre'),
      new ElementRowTable('description','Descripción'),
      new ElementRowTable('formulaReal','Formula'),
      new ElementRowTable('actions','Acciones'),
    ];
}

export class FormulaText{

  static modalCreate = 'Crear Formula';
  static modalUdpate =  'Editar Formula';
  //static saveText: 'Desea guardar el nivel?';
  //static saveAndCloseText: 'Desea guardar el nivel y cerrar?';
} 