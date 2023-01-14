import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EvaluationService } from '@core/services/evaluation/evaluation.service';
import { IEvaluationDetail } from '@modules/evaluation/interfaces/evaluation-detail.interface';
import { IPeriodEvaluation } from '@modules/period/interfaces/period-in-progress.interface';

@Component({
  selector: 'app-evaluation-history',
  templateUrl: './evaluation-history.component.html',
  styleUrls: ['./evaluation-history.component.scss']
})
export class EvaluationHistoryComponent implements OnInit {

  evaluations: IEvaluationDetail[] = [];

  constructor(
    private _evaluationService: EvaluationService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._evaluationService.getAllDetail()
      .subscribe(evaluations => this.evaluations =  evaluations);
  }

  goEvaluationDetail(evaluationDetail: IEvaluationDetail){
    this._router.navigateByUrl(`/evaluation/${evaluationDetail.evaluation?.id}/detail`);
  }

}
