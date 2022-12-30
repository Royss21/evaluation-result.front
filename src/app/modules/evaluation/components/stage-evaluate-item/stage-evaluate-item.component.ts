import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStageRangeDate } from '@modules/evaluation/interfaces/evaluation-detail.interface';
import { EvaluationBehaviorsService } from '@modules/evaluation/services/evaluation-behaviors.service';
import { ConstantsGeneral } from '@shared/constants';

@Component({
  selector: 'app-stage-evaluate-item',
  templateUrl: './stage-evaluate-item.component.html',
  styleUrls: ['./stage-evaluate-item.component.scss']
})
export class StageEvaluateItemComponent implements OnInit {

  @Input() stageRangeDate: IStageRangeDate;

  constructor(
    private _evaluationBehavior: EvaluationBehaviorsService
  ) { }

  ngOnInit(): void {
  }

  onClick(){
    this._evaluationBehavior.gotoEvaluateStage(this.stageRangeDate.stageId);
  }


}
