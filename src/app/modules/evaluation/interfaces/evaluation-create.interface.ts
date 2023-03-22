
export interface IEvaluationCreate {
  periodId: number;
  name: string;
  weight: number;
  startDate: Date;
  endDate: Date;
  isEvaluationTest: boolean;
  evaluationComponents: IEvaluationComponent[],
  evaluationComponentStages: IEvaluationComponentStage[],
}


export interface IEvaluationRes {
  id: string;
  periodId: number;
  name: string;
  startDate: Date;
  endDate: Date;
  weight: number;
}

export interface IEvaluationComponent {
  componentId: number
  checked: boolean,
  img: string,
  title: string,
  subtitle: string,
  startDate: Date | null,
  endDate: Date | null,
}

export interface IEvaluationComponentStage {
  componentId: number | null;
  stageId: number;
  startDate: Date | null
  endDate:Date | null;
  title: string;
}

