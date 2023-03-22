import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { EvaluationService } from '@core/services/evaluation/evaluation.service';
import { ICollaboratorLeaderEvaluate } from '@modules/evaluation-leader/interfaces/leader.interface copy';
import { IStageRangeDate } from '@modules/evaluation/interfaces/evaluation-detail.interface';
import { EvaluationBehaviorsService } from '@modules/evaluation/services/evaluation-behaviors.service';
import { IPeriodEvaluation } from '@modules/period/interfaces/period-in-progress.interface';
import { ConstantsGeneral } from '@shared/constants';

@Component({
  selector: 'app-evaluation-current-card',
  templateUrl: './evaluation-current-card.component.html',
  styleUrls: ['./evaluation-current-card.component.scss']
})
export class EvaluationCurrentCardComponent implements OnInit {

  @Input() showButtonDelete : boolean = false;
  @Input() periodEvaluation: IPeriodEvaluation | null;
  @Input() stagesRangeDate: IStageRangeDate[] = [];

  leaderFlag: ICollaboratorLeaderEvaluate;
  constructor(
    public _evaluationBehavior: EvaluationBehaviorsService,
    private _evaluationService : EvaluationService,
    private _dialog: MatDialog,
  ){}

  ngOnInit(){
    if(localStorage.getItem('collaboratorId')){
      this._evaluationBehavior.flagLeader$
          .subscribe(data => {
            this.leaderFlag = data;
          });
    }
  }

  deleted(){
    this._evaluationService.delete(this.periodEvaluation?.evaluation?.id || "")
      .subscribe(() => {
        this._showConfirmMessage();
      })
  }

  private _showConfirmMessage(): void {
    const dialogRefConfirm = this._dialog.open(PopupConfirmComponent, {
      data: {
        icon: 'check_circle',
        iconColor: 'color-primary',
        text: 'Se ha eliminado la evaluación exitosamente.',
        buttonLabelAccept: 'Aceptar'
      },
      autoFocus: false,
      restoreFocus: false
    });

    dialogRefConfirm.afterClosed().subscribe(() => this._evaluationBehavior.removeCardEvaluationCurrent());
  }

  enableStage(stageId : number){
    if(ConstantsGeneral.stages.feedback === stageId)
      return this.leaderFlag .isLeaderStageFeedback;

    return this.leaderFlag ? false : true;
  }

}
