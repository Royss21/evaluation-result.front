import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { ElementRowTable } from '@components/table/models/table.model';

export class AreaObjectivesHelper {
  static columnsTable: IElementRowTable[] = [
    new ElementRowTable('name', 'Nombre'),
    new ElementRowTable('areaName', 'Area'),
    new ElementRowTable('chargeCount', '# Cargos'),
    new ElementRowTable('chargeCountAssigned', '# Cargos Asign.'),
    new ElementRowTable('actions', 'Acciones', true),
  ];

  static titleActions = {
    list: 'Listado de Objetivos de Área',
    modalCreate: 'Crear Objetivo de Área',
    modalUdpate: 'Editar Objetivo de Área',
  };
}
