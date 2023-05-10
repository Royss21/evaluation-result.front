export interface IEvaluationComponentDates {
  name: string;
  weight: number;
  startDate: Date;
  endDate: Date;
  componentStagesDates: IComponentStagesDates[];
}

export interface IComponentStagesDates {
  id: number;
  componentId: number;
  startDate: Date;
  endDate: Date;
  stageId: number;
}
