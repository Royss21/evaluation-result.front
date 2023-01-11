import { ElementRowTable } from "@components/table/models/table.model";
import { IElementRowTable } from "@components/table/interfaces/table.interface";

export class WeightPerComponentHelper{
  static columnsTable: IElementRowTable[] =  [
    new ElementRowTable('name','Nivel | Jerarquía'),
    new ElementRowTable('corporateGoals','Obj. Corporativos'),
    new ElementRowTable('areaObjectives','Obj. de Área'),
    new ElementRowTable('competences','Competencias'),
    new ElementRowTable('actions','Acciones')
  ];

  static titleActionText = {
    list: 'Listado de pesos por jerarquía',
    modalAssign:  'Asignar pesos por jerarquía'
  }
}
