import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IRole } from '@auth/interfaces/roles.interface';

@Component({
  selector: 'app-check-role',
  templateUrl: './check-role.component.html',
  styleUrls: ['./check-role.component.scss']
})
export class CheckRoleComponent {

  userRoles:IRole[] = [];

  constructor(
    public _dialog: MatDialog,
    private _modalRef: MatDialogRef<CheckRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRole[]
  ) {

    this.userRoles = data;
  }

  testClick(role: any): void {
    if (role === null)
      return;

    this._modalRef.close(role.id);
  }



}
