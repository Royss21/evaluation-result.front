import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRole } from '@modules/role/interfaces/role.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';

@Injectable({
  providedIn: 'root'
})
export class RoleBuilderService {

  constructor(private _fb: FormBuilder) { }

  public buildRoleForm(role?: IRole): FormGroup {
    return this._fb.group({
      id: [role?.id || null],
      name: [
        role?.name || null,
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(100)
        ]
      ],
      description: [
        role?.description || null,
        Validators.maxLength(400)
      ]
    })
  }

}
