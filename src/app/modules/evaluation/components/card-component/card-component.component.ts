import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IComponentsRangeDate } from '@modules/evaluation/interfaces/evaluation-detail.interface';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.scss']
})
export class CardComponentComponent {

  @Input() infoComponent: IComponentsRangeDate | null;
  @Input() isEnable: boolean = false;
  @Output() emitNavigate = new EventEmitter<number>();

  onClick(){
    this.emitNavigate.emit(this.infoComponent?.componentId || 0);
  }

}
