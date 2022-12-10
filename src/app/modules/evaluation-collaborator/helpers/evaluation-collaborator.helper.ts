import { IElementRowTable } from "@components/table/interfaces/table.interface";
import { ElementRowTable } from "@components/table/models/table.model";

export class EvaluationCollaboratorHelper{
    static columnsTable: IElementRowTable[] =  [
      new ElementRowTable('collaboratorName','Colaborador'),
      new ElementRowTable('documentNumber','Documento'),
      new ElementRowTable('chargeName','Cargo'),
      new ElementRowTable('areaName','Area'),
      new ElementRowTable('gerencyName','Gerencia'),
      new ElementRowTable('hierarchyName','Jerarquia'),
      new ElementRowTable('levelName','Nivel'),
      new ElementRowTable('isLeaderCompetencies','Evalua Comp.'),
      new ElementRowTable('isLeaderAreaObjectives','Evalua Obj. Area.'),
      new ElementRowTable('actions','Acciones'),
    ];
}


export class EvaluationCollaboratorText{
  static modalRegisterCollaborator = 'Registrar colaborador en la evaluación';
} 