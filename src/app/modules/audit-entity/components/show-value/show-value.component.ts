import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-value',
  templateUrl: './show-value.component.html',
  styleUrls: ['./show-value.component.scss']
})
export class ShowValueComponent {

  public modalTitle: string = "";

  constructor(
    public _dialog: MatDialog,
    private _modalRef: MatDialogRef<ShowValueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number,  textValue: string }
  ) {
    this.modalTitle = data.id === 1 ? "Valor anterior" : "Valor nuevo";
  }

}
