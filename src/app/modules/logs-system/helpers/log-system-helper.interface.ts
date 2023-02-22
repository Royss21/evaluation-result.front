import { ElementRowTable } from "@components/table/models/table.model";
import { IElementRowTable } from "@components/table/interfaces/table.interface";

export class LogSystemHelper {
  static columnsTable: IElementRowTable[] =  [
    new ElementRowTable('fullNameService','Servicio'),
    new ElementRowTable('typeException','Tipo excepción'),
    new ElementRowTable('innerExceptionMessage','Mensaje interno'),
    new ElementRowTable('stackTrace','Rastro de pila'),
    new ElementRowTable('createDate','Fecha registro'),
    new ElementRowTable('createUser','Usuario registro')
  ];

  static titleActionText = {
    list: 'Listado de logs del sistema'
  }
}
