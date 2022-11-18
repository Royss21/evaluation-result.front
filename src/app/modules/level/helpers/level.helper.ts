import { IElementRowTable } from "@components/table/interfaces/table.interface";
import { ElementRowTable } from "@components/table/models/table.model";

export class LevelHelper{
    static columnsTable: IElementRowTable[] =  [
      new ElementRowTable('id','#'),
      new ElementRowTable('name','Nombre'),
      new ElementRowTable('description','Descripción'),
    ];
  }
  