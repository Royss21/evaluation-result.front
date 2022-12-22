import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stage-evaluate-item',
  templateUrl: './stage-evaluate-item.component.html',
  styleUrls: ['./stage-evaluate-item.component.scss']
})
export class StageEvaluateItemComponent implements OnInit {

  @Input() stageName: string;
  @Input() rangeDate: string;

  constructor() { }

  ngOnInit(): void {
  }

}
