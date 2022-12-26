export interface IEvaluation {
  periodId: number;
  name: string;
  weight: Number;
  startDate: Date;
  endDate: Date;
  isEvaluationTest: Boolean;
}

export interface ICorpGoals {
  startDate: Date;
  endDate: Date;
  isCalc: boolean
}

export interface IAreaGoals {
  startDate: Date;
  endDate: Date;
}

export interface IEvaluationStage {
  startDate: Date;
  endDate: Date;
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
