import { IEvaluation } from '@modules/evaluation/interfaces/evaluation.interface';

export interface IPeriodEvaluation {
  periodId: number;
  periodName: string;
  startDate: Date;
  endDate: Date;
  evaluation: IEvaluation | null;
}
