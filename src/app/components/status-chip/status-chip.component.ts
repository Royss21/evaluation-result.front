import { Component, Input } from '@angular/core';
import { ConstantsGeneral } from '@shared/constants';

@Component({
  selector: 'app-status-chip',
  templateUrl: './status-chip.component.html',
  styleUrls: ['./status-chip.component.scss']
})
export class StatusChipComponent {

  @Input() statusId: number;
  status: any;

  constructor() {
    this.status = ConstantsGeneral.status;
  }

}
