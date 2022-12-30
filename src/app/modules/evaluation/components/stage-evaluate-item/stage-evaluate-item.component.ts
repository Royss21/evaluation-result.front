import { Component, Input } from '@angular/core';
import { IStageRangeDate } from '@modules/evaluation/interfaces/evaluation-detail.interface';
import { EvaluationBehaviorsService } from '@modules/evaluation/services/evaluation-behaviors.service';

@Component({
  selector: 'app-stage-evaluate-item',
  templateUrl: './stage-evaluate-item.component.html',
  styleUrls: ['./stage-evaluate-item.component.scss']
})
export class StageEvaluateItemComponent  {

  @Input() stageRangeDate: IStageRangeDate;

  constructor(
    private _evaluationBehavior: EvaluationBehaviorsService
  ) { }

  onClick(){
    this._evaluationBehavior.gotoEvaluateStage(this.stageRangeDate.stageId);
  }

}
