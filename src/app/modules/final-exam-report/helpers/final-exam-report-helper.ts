import { ElementRowTable } from "@components/table/models/table.model";
import { IElementRowTable } from "@components/table/interfaces/table.interface";

export class FinalExamReportHelper {
  static columnsTable: IElementRowTable[] =  [
    new ElementRowTable('collaboratorName','Colaborador',true),
    new ElementRowTable('documentNumber','Nro. documento',true),
    new ElementRowTable('hierarchyName','Jerarquía',true),
    new ElementRowTable('gerencyName','Gerencia',true),
    new ElementRowTable('areaName','Área',true),
    new ElementRowTable('levelName','Nivel',true),
    new ElementRowTable('resultLabel','Desempeño',true),
    new ElementRowTable('finalResult','Nota',true)
  ];

  static titleActionText = {
    list: 'Listado de notas finales'
  }
}
