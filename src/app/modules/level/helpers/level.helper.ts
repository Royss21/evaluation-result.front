import { ElementRowTable } from '@components/table/models/table.model';
import { IElementRowTable } from '@components/table/interfaces/table.interface';

export class LevelHelper {
  static columnsTable: IElementRowTable[] = [
    new ElementRowTable('name', 'Nombre'),
    new ElementRowTable('description', 'Descripción'),
    new ElementRowTable('actions', 'Acciones', true),
  ];
}

export class LevelText {
  static modalCreate = 'Crear Nivel';
  static modalUdpate = 'Editar Nivel';
  //static saveText: 'Desea guardar el nivel?';
  //static saveAndCloseText: 'Desea guardar el nivel y cerrar?';
}
