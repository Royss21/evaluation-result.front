import { IElementRowTable } from "@components/table/interfaces/table.interface";
import { ElementRowTable } from "@components/table/models/table.model";

export class EvaluationCollaboratorHelper{
    static columnsTable: IElementRowTable[] =  [
      new ElementRowTable('collaboratorName','Colaborador', true),
      new ElementRowTable('documentNumber','Documento' , true),
      new ElementRowTable('chargeName','Cargo', true),
      new ElementRowTable('areaName','Area' , true ),
      new ElementRowTable('gerencyName','Gerencia' , true),
      new ElementRowTable('hierarchyName','Jerarquia' , true),
      new ElementRowTable('levelName','Nivel' , true),
      new ElementRowTable('isLeaderCompetencies','Evalua Comp.' , true),
      new ElementRowTable('isLeaderAreaObjectives','Evalua Obj. Area.' , true),
      new ElementRowTable('actions','Acciones', true)
    ];
}


export class EvaluationCollaboratorText{
  static modalRegisterCollaborator = 'Registrar colaborador en la evaluación';
}
