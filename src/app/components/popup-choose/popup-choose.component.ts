import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IPopupChoose } from '../popup-interface';

@Component({
  selector: 'app-popup-choose',
  templateUrl: './popup-choose.component.html',
  styleUrls: ['./popup-choose.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopupChooseComponent {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: IPopupChoose) { }

  goConfirm() {
    this.dialogRef.close(true)
  }
}
