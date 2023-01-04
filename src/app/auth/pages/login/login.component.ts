import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';

import { ConstantsGeneral } from '@shared/constants';
import { IRole } from '@auth/interfaces/roles.interface';
import { AuthService } from '@core/services/auth/auth.service';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { AuthBuilderService } from '@auth/services/auth-builder.service';
import { CheckRoleComponent } from '@auth/components/check-role/check-role.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private _code: string | null;
  private rolesList: IRole[] = [];

  public showUsername: boolean = true;
  public showPassword: boolean = false;
  public isViewCode: boolean = false;
  public isViewLogin: boolean = true;

  public loginForm: FormGroup;
  public codeForm: FormGroup;

  constructor(
    public _dialog: MatDialog,
    public _authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public _authBuilderService: AuthBuilderService
  ) {
    this._code = this.activatedRoute.snapshot.queryParamMap?.get('code');
    if (this._code) {
      this.isViewLogin = false;
      this.isViewCode = true;
    }
    this.loginForm = this._authBuilderService.builderLoginForm();
    this.codeForm = this._authBuilderService.builderCodeForm();
  }

  public validUser(): void {

    if(this.loginForm.invalid)
      return;

    this._authService.validateUser(this.controlsLoginForm['username'].value)
      .subscribe(resp => {
        this.rolesList = resp.roles;
        this._openModal();
      })
  }

  public login(): void {
    console.log("VALUES: ", this.loginForm.value)
  }

  public loginCode(): void {

  }

  private _openModal(): void {
    const modalCheckRol = this._dialog.open(CheckRoleComponent, {
      width: ConstantsGeneral.mdModal,
      disableClose: true,
      panelClass: 'modal-check-role',
      data: this.rolesList,
    });

    modalCheckRol.afterClosed()
      .subscribe((idRol) => {
        this.showUsername = false;
        this.showPassword = true;
        this.controlsLoginForm['roleId'].setValue(idRol);
        this.controlsLoginForm['password'].setValidators(Validators.required);
      });
  }

  public get controlsCodeForm(): { [key: string]: AbstractControl } {
    return this.codeForm.controls;
  }

  public get controlsLoginForm(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  private validateCode(code: string): void {
    // this.userService.validateRecoveryPassword({ code })
    //   .subscribe((codeDesencrypt: string) => {
    //     this.controlsFormCode.code.setValue(codeDesencrypt);
    //   });
  }
}
