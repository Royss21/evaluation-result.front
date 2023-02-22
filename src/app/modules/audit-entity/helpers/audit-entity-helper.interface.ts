import { ElementRowTable } from "@components/table/models/table.model";
import { IElementRowTable } from "@components/table/interfaces/table.interface";

export class AuditEntityHelper {
  static columnsTable: IElementRowTable[] =  [
    new ElementRowTable('tableName','Nombre'),
    new ElementRowTable('keyValues','Valor clave'),
    new ElementRowTable('oldValues','Valor anterior'),
    new ElementRowTable('newValues','Valor nuevo'),
    new ElementRowTable('createDate','Fecha registro'),
    new ElementRowTable('createUser','Usuario registro')
  ];

  static titleActionText = {
    list: 'Listado de entidades de auditoría'
  }
}
