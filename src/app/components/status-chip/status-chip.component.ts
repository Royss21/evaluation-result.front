import { Component, Input, OnInit } from '@angular/core';
import { ConstantsGeneral } from '@shared/constants';

@Component({
  selector: 'app-status-chip',
  templateUrl: './status-chip.component.html',
  styleUrls: ['./status-chip.component.scss']
})
export class StatusChipComponent implements OnInit {

  @Input() statusId: number;
  status: any;
  
  constructor() { 
    this.status = ConstantsGeneral.status;
  }

  ngOnInit(): void {
  }

}
