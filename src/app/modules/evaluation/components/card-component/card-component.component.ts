import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICollaboratorLeaderEvaluate } from '@modules/evaluation-leader/interfaces/leader.interface copy';
import { IComponentsRangeDate } from '@modules/evaluation/interfaces/evaluation-detail.interface';
import { EvaluationBehaviorsService } from '@modules/evaluation/services/evaluation-behaviors.service';
import { ConstantsGeneral } from '@shared/constants';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.scss']
})
export class CardComponentComponent {

  @Input() infoComponent: IComponentsRangeDate | null;
  @Input() isEnable: boolean = false;
  @Input() isActive: boolean = false;
  @Output() emitNavigate = new EventEmitter<number>();


  leaderFlag: ICollaboratorLeaderEvaluate;
  constructor(public _evaluationBehavior: EvaluationBehaviorsService){}

  ngOnInit(){
    if(localStorage.getItem('collaboratorId')){
      this._evaluationBehavior.flagLeader$
          .subscribe(data => {
            console.log(data)
            this.leaderFlag = data;
          });
    }
  }


  onClick(){
    this.emitNavigate.emit(this.infoComponent?.componentId || 0);
  }

  enableStage(stageId : number){
    if(ConstantsGeneral.stages.evaluation === stageId)
      return this.leaderFlag .isLeaderStageEvaluation;
    if(ConstantsGeneral.stages.calibration === stageId)
      return this.leaderFlag .isLeaderStageCalibration;
    return true;
  }
}
