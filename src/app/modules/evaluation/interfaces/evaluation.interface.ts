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

export interface ICompetences {
  startDate: Date | null;
  endDate: Date | null;
  title: string;
  description: string;
}

export interface ICalibrationStage {
  startDate: Date;
  endDate: Date;
}
