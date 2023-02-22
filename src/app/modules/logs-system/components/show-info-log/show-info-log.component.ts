import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-info-log',
  templateUrl: './show-info-log.component.html',
  styleUrls: ['./show-info-log.component.scss']
})
export class ShowInfoLogComponent{

  public modalTitle: string = "";

  constructor(
    public _dialog: MatDialog,
    private _modalRef: MatDialogRef<ShowInfoLogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { textValue: string, nameField: string }
  ) {
    this.modalTitle = `Información ${data.nameField}`;
  }

}
