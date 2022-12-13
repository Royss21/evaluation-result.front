import { IElementRowTable } from "@components/table/interfaces/table.interface";
import { ElementRowTable } from "@components/table/models/table.model";

export class EvaluateComponentHelper{
    static columnsTable: IElementRowTable[] =  [
      new ElementRowTable('collaboratorName','Colaborador', true),
      new ElementRowTable('documentNumber','Documento' , true),
      new ElementRowTable('chargeName','Cargo' , true),
      new ElementRowTable('areaName','Area' , true),
      new ElementRowTable('gerencyName','Gerencia' , true),
      new ElementRowTable('hierarchyName','Jerarquia' , true),
      new ElementRowTable('levelName','Level' , true),
      new ElementRowTable('statusId','Estado' , true),
      new ElementRowTable('actions','Acciones' , true),
    ];
}


export class EvaluateComponentText{

  static titleCorporateObjectives = 'Listado de colaboradores de Objetivos Corporativos';
  static titleAreaObjectives = 'Listado de colaboradores de Objetivos de Area'; 
  static titleCompetencies = 'Listado de colaboradores de Competencias';
  
}