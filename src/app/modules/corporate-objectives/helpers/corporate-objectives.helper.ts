import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { ElementRowTable } from '@components/table/models/table.model';

export class CorporateObjectivesHelper {
  static columnsTable: IElementRowTable[] = [
    new ElementRowTable('name', 'Nombre'),
    new ElementRowTable('areaName', 'Area'),
    new ElementRowTable('formulaName', 'Formula'),
    new ElementRowTable('chargeCount', '# Cargos'),
    new ElementRowTable('chargeCountAssigned', '# Cargos Asign.'),
    new ElementRowTable('actions', 'Acciones', true),
  ];
}

export class CorporateObjectivesText {
  static modalCreate = 'Crear Objetivo Corporativo';
  static modalUdpate = 'Editar Objetivo Corporativo';
}
