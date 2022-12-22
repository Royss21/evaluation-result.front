import { IEvaluationCurrent } from "@modules/evaluation/interfaces/evaluation-current.interface";

export interface IPeriodInProgress {
   periodId: number;
   periodName: string;
   startDate: Date;
   endDate: Date;
   evaluationCurrent: IEvaluationCurrent | null;
}

