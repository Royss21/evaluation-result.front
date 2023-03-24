import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { EvaluationService } from '@core/services/evaluation/evaluation.service';
import { PeriodService } from '@core/services/period/period.service';
import { EvaluationBehaviorsService } from '@modules/evaluation/services/evaluation-behaviors.service';
import { IPeriodEvaluation } from '@modules/period/interfaces/period-in-progress.interface';
import { IPeriod } from '@modules/period/interfaces/period.interface';

@Component({
  selector: 'app-evaluation-section',
  templateUrl: './evaluation-section.component.html',
  styleUrls: ['./evaluation-section.component.scss']
})
export class EvaluationSectionComponent {

  periodInProgress: IPeriodEvaluation | null;

  constructor(
    private _periodService: PeriodService,
    private _evaluationService: EvaluationService,
    private _dialog: MatDialog,
    public _evaluationBehavior: EvaluationBehaviorsService,
    private _router: Router
  ) {

  }

  ngOnInit(): void{
    this.getEvaluationInProgress();
    this._evaluationBehavior.evaluationCurrent$
      .subscribe(() => {
        if(this.periodInProgress?.evaluation)
          this.periodInProgress.evaluation= null;
      });
  }

  getEvaluationInProgress(): void{
    this._periodService.getInProgress().subscribe( periodInProgress =>{
      this.periodInProgress = periodInProgress;
    })
  }

  goEvaluation(): void {

    const period: IPeriod = {
      name: this.periodInProgress?.periodName || "",
      id: this.periodInProgress?.periodId || 0,
      startDate: this.periodInProgress?.startDate || new Date(),
      endDate: this.periodInProgress?.endDate || new Date(),
    };

    this._router.navigateByUrl(`/evaluation/create`, { state: period });
  }

  goToHistory(){
    this._router.navigateByUrl(`/evaluation/history`);
  }

  goEvaluationDetail(){
    this._router.navigateByUrl(`/evaluation/${this.periodInProgress?.evaluation?.id}/detail`);
  }

  deleted(){
    this._evaluationService.delete(this.periodInProgress?.evaluation?.id || "")
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

}
