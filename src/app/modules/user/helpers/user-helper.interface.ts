import { IElementRowTable } from "@components/table/interfaces/table.interface";
import { ElementRowTable } from "@components/table/models/table.model";

export class UserHelper{
  static columnsTable: IElementRowTable[] =  [
    new ElementRowTable('userName','Nombre de Usuario'),
    new ElementRowTable('names','Nombre'),
    new ElementRowTable('lastName','Apellidos'),
    new ElementRowTable('email','Correo'),
    new ElementRowTable('actions','Acciones', true)
  ];

  static titleActionText = {
    list: 'Listado de usuarios',
    modalCreate: 'Crear Usuario',
    modalUpdate: 'Editar Usuario'
  }
}
