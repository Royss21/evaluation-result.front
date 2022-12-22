import { Component, Input, OnInit } from '@angular/core';
import { IStageRangeDate } from '@modules/evaluation/interfaces/stage-range-date.interface';
import { IPeriodInProgress } from '@modules/period/interfaces/period-in-progress.interface';

@Component({
  selector: 'app-evaluation-current-card',
  templateUrl: './evaluation-current-card.component.html',
  styleUrls: ['./evaluation-current-card.component.scss']
})
export class EvaluationCurrentCardComponent implements OnInit {

  @Input() periodInProgress: IPeriodInProgress | null;
  @Input() stagesRangeDate: IStageRangeDate[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
