import { IElementRowTable } from "@components/table/interfaces/table.interface";
import { ElementRowTable } from "@components/table/models/table.model";
import { ILeaderCollaboratorFilter } from "../interfaces/leader-collaborador-filter.interface";

export class LeaderHelper{
    static columnsTable: IElementRowTable[] =  [
      new ElementRowTable('leaderName','Nombre Lider'),
      new ElementRowTable('documentNumber','Documento'),
      new ElementRowTable('areaName','Area'),
      new ElementRowTable('countAssignedCollaborator','# Colab. Asignados'),
      new ElementRowTable('actions','Acciones'),
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
} 