import { ElementRowTable } from "@components/table/models/table.model";
import { IElementRowTable } from "@components/table/interfaces/table.interface";

export class FinalExamReportHelper {
  static columnsTable: IElementRowTable[] =  [
    new ElementRowTable('collaboratorName','Colaborador'),
    new ElementRowTable('documentNumber','Nro. documento'),
    new ElementRowTable('hierarchyName','Jerarquía'),
    new ElementRowTable('gerencyName','Gerencia'),
    new ElementRowTable('areaName','Área'),
    new ElementRowTable('levelName','Nivel'),
    new ElementRowTable('resultLabel','Desempeño'),
    new ElementRowTable('finalResult','Nota')
  ];

  static titleActionText = {
    list: 'Listado de notas finales'
  }
}
