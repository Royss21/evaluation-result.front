import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PeriodService } from '@core/services/period/period.service';
import { IPeriodInProgress } from '@modules/period/interfaces/period-in-progress.interface';
import { IPeriod } from '@modules/period/interfaces/period.interface';

@Component({
  selector: 'app-evaluation-section',
  templateUrl: './evaluation-section.component.html',
  styleUrls: ['./evaluation-section.component.scss']
})
export class EvaluationSectionComponent {

  periodInProgress: IPeriodInProgress | null;

  constructor(
    private _periodService: PeriodService,
    private _router: Router
  ) {

  }

  ngOnInit(): void{
    this.getEvaluationInProgress();
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

  goEvaluationDetail(){
    this._router.navigateByUrl(`/evaluation/${this.periodInProgress?.evaluationCurrent?.id}/detail`);
  }

}
