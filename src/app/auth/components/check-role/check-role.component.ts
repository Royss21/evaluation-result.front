import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IRole } from '@auth/interfaces/roles.interface';

@Component({
  selector: 'app-check-role',
  templateUrl: './check-role.component.html',
  styleUrls: ['./check-role.component.scss']
})
export class CheckRoleComponent {

  public dataTest = [
    {
      id: 1,
      name: 'Supervisor'
    },
    {
      id: 2,
      name: 'Administrador'
    },
    {
      id: 3,
      name: 'Super Administrador'
    },
    {
      id: 4,
      name: 'Registrador'
    },
  ]

  constructor(
    public _dialog: MatDialog,
    private _modalRef: MatDialogRef<CheckRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRole[]
  ) {
  }

  testClick(role: any): void {
    if (role === null)
      return;

    this._modalRef.close(role.id);
  }



}
