import { Component } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { AuthService } from '@core/services/auth/auth.service';
import { AuthBuilderService } from '@auth/services/auth-builder.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup;

  constructor(
    public _authService: AuthService,
    public _authBuilderService: AuthBuilderService
  ) {
    this.loginForm = this._authBuilderService.builderLoginForm();
  }

  public login(): void {

  }

  public get controlsForm(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
}
