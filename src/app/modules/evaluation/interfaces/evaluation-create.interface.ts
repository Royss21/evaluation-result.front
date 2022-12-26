import { IEvaluationComponent, IEvaluationComponentStage } from "./evaluation.interface";

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


