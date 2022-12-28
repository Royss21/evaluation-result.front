import { Component, Input } from '@angular/core';

import { EvaluationBehaviorsService } from '@modules/evaluation/services/evaluation-behaviors.service';

@Component({
  selector: 'app-stage-evaluate-item',
  templateUrl: './stage-evaluate-item.component.html',
  styleUrls: ['./stage-evaluate-item.component.scss']
})
export class StageEvaluateItemComponent  {

  @Input() stageName: string;
  @Input() rangeDate: string;
  @Input() stageId: number;

  constructor(
    private _evaluationBehavior: EvaluationBehaviorsService
  ) { }

  onClick(){
    this._evaluationBehavior.gotoEvaluateStage(this.stageId);
  }

}
