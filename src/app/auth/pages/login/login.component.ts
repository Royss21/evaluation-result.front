import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';

import { ConstantsGeneral } from '@shared/constants';
import { IRole } from '@auth/interfaces/roles.interface';
import { ILogin } from '@auth/interfaces/login.interface';
import { MainBehaviorsService } from '@modules/main/services';
import { AuthService } from '@core/services/auth/auth.service';
import { AuthBuilderService } from '@auth/services/auth-builder.service';
import { CheckRoleComponent } from '@auth/components/check-role/check-role.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private _code: string | null;
  private rolesList: IRole[] = [];

  public showUsername = true;
  public showPassword = false;
  public isViewCode = false;
  public isViewLogin = true;

  public loginForm: FormGroup;
  public codeForm: FormGroup;
  private _loginFrom: ILogin;

  constructor(
    public _dialog: MatDialog,
    private _router: Router,
    public _authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public _authBuilderService: AuthBuilderService,
    private _mainBehaviorService: MainBehaviorsService
  ) {
    this._code = this.activatedRoute.snapshot.queryParamMap?.get('code');
    this.loginForm = this._authBuilderService.builderLoginForm();
    this.codeForm = this._authBuilderService.builderCodeForm();
  }

  ngOnInit(): void {
    if (this._code) {
      this.isViewLogin = false;
      this.isViewCode = true;
      this._authService
        .loginSessionCollaborator(this._code)
        .subscribe((token) => {
          localStorage.setItem('token', token.token);
          localStorage.setItem('refreshToken', token.refreshToken);
          localStorage.setItem('name', token.name);
          localStorage.setItem('evaluationId', token.evaluationId);
          localStorage.setItem('logingCollaborator', '1');
          localStorage.setItem(
            'typeViewCollaborator',
            token.typeViewCollaborator.toString()
          );
          localStorage.setItem(
            'collaboratorId',
            token.evaluationCollaboratorId
          );

          this._mainBehaviorService.emitName(token.name);
          console.log(token);
          if (
            ConstantsGeneral.ViewCollaborator.leader ==
            token.typeViewCollaborator
          ) {
            localStorage.setItem(
              'isLeaderAreaObjetive',
              String(token.isLeaderAreaObjetive)
            );
            localStorage.setItem(
              'isLeaderCompetence',
              String(token.isLeaderCompetence)
            );
            console.log('aaaaa');
            this._router.navigateByUrl(
              `/evaluation/${token.evaluationId}/detail`
            );
          } else
            this._router.navigateByUrl(
              `/evaluation/${token.evaluationId}/collaborator/${token.evaluationCollaboratorId}/review`
            );
        });
    }
  }

  public validUser(): void {
    console.log(this.loginForm);
    if (this.loginForm.invalid) return;

    this._authService
      .validateUser(this.controlsLoginForm['username'].value)
      .subscribe((resp) => {
        this.rolesList = resp.roles;

        if (this.rolesList.length == 1) {
          this.showUsername = false;
          this.showPassword = true;
          this.loginForm.get('roleId')?.setValue(this.rolesList[0].id);
          this.loginForm.get('password')?.setValidators(Validators.required);
          this.loginForm.get('password')?.updateValueAndValidity();
        } else {
          this._openModal();
        }
      });
  }

  public login(): void {
    if (this.loginForm.invalid) return;

    const login = this.loginForm.getRawValue();
    this._authService.loginSession(login).subscribe((s) => {
      localStorage.setItem('token', s.token);
      localStorage.setItem('refreshToken', s.refreshToken);
      localStorage.setItem('name', s.name);
      localStorage.setItem('roleName', s.roleName);
      localStorage.setItem('menus', JSON.stringify(s.menus));
      localStorage.setItem('logingCollaborator', '0');

      this._mainBehaviorService.emitMenu(s.menus);
      this._mainBehaviorService.emitRoleName(s.roleName);
      this._mainBehaviorService.emitName(s.name);

      this._router.navigateByUrl(`/`);
    });
  }

  public loginCode(): void {
    console.log(this.codeForm);
    console.log(this.codeForm.getRawValue());
  }

  return() {
    this.showUsername = true;
    this.showPassword = false;
    this.loginForm.get('roleId')?.setValue(null);
    this.loginForm.get('password')?.setValue(null);
    this.loginForm.get('password')?.clearValidators();
    this.loginForm.get('password')?.updateValueAndValidity();
  }

  private _openModal(): void {
    const modalCheckRol = this._dialog.open(CheckRoleComponent, {
      width: ConstantsGeneral.lgModal,
      disableClose: true,
      panelClass: 'modal-check-role',
      data: this.rolesList,
    });

    modalCheckRol.afterClosed().subscribe((idRol) => {
      this.showUsername = false;
      this.showPassword = true;
      this.loginForm.get('roleId')?.setValue(idRol);
      this.loginForm.get('password')?.setValidators(Validators.required);
      this.loginForm.get('password')?.updateValueAndValidity();
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
