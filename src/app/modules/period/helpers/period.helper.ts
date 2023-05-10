import { ElementRowTable } from '@components/table/models/table.model';
import { IElementRowTable } from '@components/table/interfaces/table.interface';

export class PeriodHelper {
  static columnsTable: IElementRowTable[] = [
    new ElementRowTable('id', '#'),
    new ElementRowTable('name', 'Nombre'),
    new ElementRowTable('startDate', 'Fecha de Inicio'),
    new ElementRowTable('endDate', 'Fecha de Fin'),
    new ElementRowTable('actions', 'Acciones', true),
  ];

  static titleActionText = {
    list: 'Listado de Periodos',
    modalCreate: 'Crear Periodo',
    modalUdpate: 'Editar Periodo',
  };
}
