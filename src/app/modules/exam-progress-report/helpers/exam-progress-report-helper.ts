import { ElementRowTable } from "@components/table/models/table.model";
import { IElementRowTable } from "@components/table/interfaces/table.interface";

export class ProgressExamReportHelper {
  static columnsTable: IElementRowTable[] =  [
    new ElementRowTable('collaboratorName','Colaborador'),
    new ElementRowTable('documentNumber','Nro. documento'),
    new ElementRowTable('hierarchyName','Jerarquía'),
    new ElementRowTable('gerencyName','Gerencia'),
    new ElementRowTable('levelName','Nivel'),
    new ElementRowTable('areaName','Área'),
    new ElementRowTable('chargeName','Cargo'),
    new ElementRowTable('resultObjectiveCorporate','Resultado Obj. Corp.'),
    new ElementRowTable('resultObjectiveArea','Resultado Obj. Área.'),
    new ElementRowTable('resultCompetence','Resultado Competencia'),
    new ElementRowTable('statusObjectiveCorporateId','ID Estado Obj. Corp.'),
    new ElementRowTable('statusObjectiveAreaId','ID Estado Obj. Área'),
    new ElementRowTable('statusCompetenceId','ID Estado Competencia'),
    new ElementRowTable('stageCurrentId','ID Estado Actual')
  ];

  static titleActionText = {
    list: 'Listado de evaluaciones en proceso'
  }
}
