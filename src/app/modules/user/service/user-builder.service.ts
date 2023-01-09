import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '@modules/user/interfaces/user.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';

@Injectable({
  providedIn: 'root'
})
export class UserBuilderService {

  constructor(private _fb: FormBuilder) { }

  public buildUserForm(user?: IUser): FormGroup {

    let rolesId: any[] = [];
    if (user) {
      rolesId = user.roles.map(role => role.id);
    }

    return this._fb.group({
      id: [user?.id || null],
      userName: [
        user?.userName || null,
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(100)
        ]
      ],
      names: [
        user?.names || null,
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(100)
        ]
      ],
      middleName: [
        user?.middleName || null,
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(100)
        ]
      ],
      lastName: [
        user?.lastName || null,
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(100)
        ]
      ],
      email: [
        user?.email || null,
        [
          Validators.email,
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(100)
        ]
      ],
      password: [
        user?.password || null,
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(100)
        ]
      ],
      rolesId: [
        rolesId || null,
        [ Validators.required ]
      ]
    });
  }
}
