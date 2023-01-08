import { Component, Inject } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConstantsGeneral } from '@shared/constants';
import { RoleService } from '@core/services/role/role.service';
import { IRole } from '@modules/role/interfaces/role.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { RoleHelper } from '@modules/role/helpers/role-helper.interface';
import { RoleBuilderService } from '@modules/role/service/role-builder.service';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss']
})
export class RoleModalComponent {

  private isCloseAfterSave: boolean = false;

  roleFormGroup: FormGroup;
  modalTitle: string = RoleHelper.titleActionText.modalCreate;

  constructor(
    public _dialog: MatDialog,
    private _roleService: RoleService,
    private _roleBuilderService: RoleBuilderService,
    private _modalRef: MatDialogRef<RoleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRole
  ) {
    this.roleFormGroup = _roleBuilderService.buildRoleForm(data);
    data && (this.modalTitle = RoleHelper.titleActionText.modalUpdate);
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.roleFormGroup.controls;
  }

  private save(role: IRole): void {
    if(!role.id)
      this._roleService.create(role).subscribe(() => this.showConfirmMessage())
    else
      this._roleService.update(role).subscribe(() => this.showConfirmMessage())
  }

  private closeOrReset(): void{

    if(this.isCloseAfterSave)
      this.closeModal();
    else
      this.roleFormGroup.reset();
  }

  private showConfirmMessage(): void {
    const dialogRefConfirm = this._dialog.open(PopupConfirmComponent, {
      data: ConstantsGeneral.confirmCreatePopup,
      autoFocus: false
    });

    dialogRefConfirm.afterClosed().subscribe(() => {
      this.closeOrReset();
    });
  }

  closeModal(): void {
    this._modalRef.close();
  }

  confirmSave(isClose: boolean = true){

    CustomValidations.marcarFormGroupTouched(this.roleFormGroup);

    if(this.roleFormGroup.invalid)
      return;

    this.isCloseAfterSave = isClose;

    const role: IRole = { ...this.roleFormGroup.getRawValue() } ;
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.save(role);
    });
  }
}
