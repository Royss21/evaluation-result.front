import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPopupConfirm } from '../popup-interface';

@Component({
  selector: 'app-popup-confirm',
  templateUrl: './popup-confirm.component.html',
  styleUrls: ['./popup-confirm.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopupConfirmComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: IPopupConfirm,
    public dialogRef: MatDialogRef<any>,
  ) { }

  close() {
    this.dialogRef.close(true)
  }

}
