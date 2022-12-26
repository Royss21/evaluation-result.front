import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvaluationBehaviorsService } from '@modules/evaluation/services/evaluation-behaviors.service';
import { ConstantsGeneral } from '@shared/constants';

@Component({
  selector: 'app-stage-evaluate-item',
  templateUrl: './stage-evaluate-item.component.html',
  styleUrls: ['./stage-evaluate-item.component.scss']
})
export class StageEvaluateItemComponent implements OnInit {

  @Input() stageName: string;
  @Input() rangeDate: string;
  @Input() stageId: number;

  constructor(
    private _evaluationBehavior: EvaluationBehaviorsService
  ) { }

  ngOnInit(): void {
  }

  onClick(){
    this._evaluationBehavior.gotoEvaluateStage(this.stageId);
  }


}
