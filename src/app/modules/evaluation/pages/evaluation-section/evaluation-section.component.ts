import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    public _evaluationBehavior: EvaluationBehaviorsService,
    private _router: Router
  ) {

  }

  ngOnInit(): void{
    this.getEvaluationInProgress();
    this._evaluationBehavior.evaluationCurrent$
      .subscribe(() => {
        this.periodInProgress = null;
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

}
