import { IElementRowTable } from "@components/table/interfaces/table.interface";
import { ElementRowTable } from "@components/table/models/table.model";
import { ILeaderCollaboratorFilter } from "../interfaces/leader-collaborador-filter.interface";

export class LeaderHelper{
    static columnsTable: IElementRowTable[] =  [
      new ElementRowTable('leaderName','Nombre Lider', true),
      new ElementRowTable('documentNumber','Documento' , true),
      new ElementRowTable('areaName','Area' , true),
      new ElementRowTable('countAssignedCollaborator','# Asignados' , true),
      new ElementRowTable('actions','Acciones' , true),
    ];

    static initialFilter: ILeaderCollaboratorFilter = {
      globalFilter: '',
      stageIds: '',
      componentId: 0,
      pageIndex: 0,
      pageSize: 10,
    }
}


export class LeaderText{
  static modalImport = 'Importar Lideres';
  static modalCollaboratorAssigned = 'Colaboradores asignados';
} 