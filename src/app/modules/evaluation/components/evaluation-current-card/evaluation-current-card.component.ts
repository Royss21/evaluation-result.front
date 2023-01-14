import { Component, Input, OnInit } from '@angular/core';
import { IStageRangeDate } from '@modules/evaluation/interfaces/evaluation-detail.interface';
import { IPeriodEvaluation } from '@modules/period/interfaces/period-in-progress.interface';

@Component({
  selector: 'app-evaluation-current-card',
  templateUrl: './evaluation-current-card.component.html',
  styleUrls: ['./evaluation-current-card.component.scss']
})
export class EvaluationCurrentCardComponent implements OnInit {

  @Input() periodEvaluation: IPeriodEvaluation | null;
  @Input() stagesRangeDate: IStageRangeDate[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
