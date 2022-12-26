import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponentsRangeDate } from '@modules/evaluation/interfaces/evaluation-detail.interface';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.scss']
})
export class CardComponentComponent implements OnInit {

  @Input() infoComponent: IComponentsRangeDate | null;
  @Input() isEnable: boolean = false;
  @Output() emitNavigate = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.emitNavigate.emit(this.infoComponent?.componentId || 0);
  }

}
