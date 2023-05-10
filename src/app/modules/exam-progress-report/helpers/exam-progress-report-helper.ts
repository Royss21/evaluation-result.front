import { ElementRowTable } from '@components/table/models/table.model';
import { IElementRowTable } from '@components/table/interfaces/table.interface';

export class ProgressExamReportHelper {
  static columnsTable: IElementRowTable[] = [
    new ElementRowTable('collaboratorName', 'Colaborador', true),
    new ElementRowTable('documentNumber', 'Nro. documento', true),
    new ElementRowTable('hierarchyName', 'Jerarquía', true),
    new ElementRowTable('gerencyName', 'Gerencia', true),
    new ElementRowTable('levelName', 'Nivel', true),
    new ElementRowTable('areaName', 'Área', true),
    new ElementRowTable('chargeName', 'Cargo', true),
    new ElementRowTable('resultObjectiveCorporate', 'Nota Obj .Corp.', true),
    new ElementRowTable('statusObjectiveCorporateId', '', true),
    new ElementRowTable('resultObjectiveArea', 'Nota Obj. Área', true),
    new ElementRowTable('statusObjectiveAreaId', '', true),
    new ElementRowTable('resultCompetence', 'Nota Comp.', true),
    new ElementRowTable('statusCompetenceId', '', true),
    new ElementRowTable('stageCurrentId', 'Estado Actual Comp.', true),
  ];

  static titleActionText = {
    list: 'Listado de evaluaciones en proceso',
  };
}
