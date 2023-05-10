import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
//import { CustomValidators } from 'ngx-custom-validators';

@Injectable({
  providedIn: 'root',
})
export class AuthBuilderService {
  constructor(private _fb: FormBuilder) {}

  public builderLoginForm(): FormGroup {
    return this._fb.group({
      username: [null, [Validators.required]],
      password: [null],
      roleId: [null],
    });
  }

  public builderCodeForm(): FormGroup {
    const codeFormControl = new FormControl(null, Validators.required);
    const confirmCodeFormControl = new FormControl('', [
      //CustomValidators.equalTo(codeFormControl as any) as any
    ]);
    return this._fb.group({
      code: codeFormControl,
      confirmCode: confirmCodeFormControl,
    });
  }
}
