import { IElementRowTable } from "@components/table/interfaces/table.interface";
import { ElementRowTable } from "@components/table/models/table.model";

export class CompetencesHelper{
    static columnsTable: IElementRowTable[] =  [
      new ElementRowTable('name','Nombre'),
      new ElementRowTable('actions','Acciones', true)
    ];

    static titleActions = {
      list: 'Listado de Competencias',
      modalCreate: 'Crear Objetivo Corporativo',
      modalUdpate:  'Editar Objetivo Corporativo'
    }
}
