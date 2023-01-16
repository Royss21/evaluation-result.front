export interface ISubcomponent {
  id: string; // subComponentId, se envia al crear y editar cargos
  componentId: number;
  formulaId: string;
  areaId: number;
  name: string;
  description: string;
  areaName: string;
  formulaName: string;
  chargeCount: number;
  chargeCountAssigned: number;
}
