import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IRole } from '@auth/interfaces/roles.interface';

@Component({
  selector: 'app-check-role',
  templateUrl: './check-role.component.html',
  styleUrls: ['./check-role.component.scss']
})
export class CheckRoleComponent {

  public userRoles:IRole[] = [];
  private _roleId: number = 0;

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


  }

  selectedTest(id: number) {
    if (id === null)
      return;

    this._roleId = id;
    const containers = document.querySelectorAll('.item-rol');

    containers.forEach(container => {
      container.addEventListener('click', () => {
        containers.forEach(c => c.classList.remove('active'));
        container.classList.add('active');
      });
    });
  }

  continueLogin() {
    if (this._roleId  == 0)
     return

    this._modalRef.close(this._roleId);
  }



}
