import { IPeriodInProgress } from "@modules/period/interfaces/period-in-progress.interface";

export interface IEvaluationDetail extends IPeriodInProgress {

  isEnableImportLeaders: boolean;
  components: IComponentsRangeDate []
  stagesEvaluation: IStageRangeDate[]
}


export interface IComponentsRangeDate{

  componentId : number;
  componentName  :string;
  rangeDate  :string;
  stages: IStageRangeDate[]
}

export interface IStageRangeDate{
  stageId :number;
  stageName  :string;
  rangeDate  : string;
}

