import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConstantsGeneral } from '@shared/constants';
import { IRole } from '@auth/interfaces/roles.interface';
import { UserService } from '@core/services/user/user.service';
import { RoleService } from '@core/services/role/role.service';
import { IUser } from '@modules/user/interfaces/user.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { UserHelper } from '@modules/user/helpers/user-helper.interface';
import { UserBuilderService } from '@modules/user/service/user-builder.service';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent {

  private isCloseAfterSave: boolean = false;

  public roleList: IRole[];
  public roles = new FormControl();
  public userFormGroup: FormGroup;
  public readonlyPassword: boolean = false;
  public modalTitle: string = UserHelper.titleActionText.modalCreate;

  constructor(
    public _dialog: MatDialog,
    private _userService: UserService,
    private _roleService: RoleService,
    private _userBuilderService: UserBuilderService,
    private _modalRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser
  ) {
    this.userFormGroup = _userBuilderService.buildUserForm(data);
    data && this._defaultValues();
    this._getRoles();
  }

  private _defaultValues(): void {
    this.readonlyPassword = true;
    this.modalTitle = UserHelper.titleActionText.modalUpdate;
    this.controlsForm['password'].setValidators(null);
  }

  private _getRoles(): void {
    this._roleService.getAll().subscribe(role => {
      this.roleList = role;
    })
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.userFormGroup.controls;
  }

  private save(user: IUser): void {
    if(!user.id)
      this._userService.create(user).subscribe(() => this.showConfirmMessage())
    else
      this._userService.update(user).subscribe(() => this.showConfirmMessage())
  }

  private closeOrReset(): void{

    if(this.isCloseAfterSave)
      this.closeModal();
    else
      this.userFormGroup.reset();
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

    CustomValidations.marcarFormGroupTouched(this.userFormGroup);

    if(this.userFormGroup.invalid)
      return;

    this.isCloseAfterSave = isClose;

    const user: IUser = { ...this.userFormGroup.getRawValue() } ;
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.save(user);
    });
  }

}
