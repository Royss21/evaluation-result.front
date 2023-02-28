import { ElementRowTable } from "@components/table/models/table.model";
import { IElementRowTable } from "@components/table/interfaces/table.interface";

export class ProgressExamReportHelper {
  static columnsTable: IElementRowTable[] =  [
    new ElementRowTable('evaluationCollaboratorId','ID Colaborador'),
    new ElementRowTable('evaluationId','ID Evaluación'),
    new ElementRowTable('resultObjectiveCorporate','Resultado Obj. Corp.'),
    new ElementRowTable('resultObjectiveArea','Resultado Obj. Área.'),
    new ElementRowTable('resultCompetence','Resultado Competencia'),
    new ElementRowTable('statusObjectiveCorporateId','ID Estado Obj. Corp.'),
    new ElementRowTable('statusCompetenceId','ID Estado Competencia'),
    new ElementRowTable('stageCurrentId','ID Estado Actual')
  ];

  static titleActionText = {
    list: 'Listado de evaluaciones en proceso'
  }
}
