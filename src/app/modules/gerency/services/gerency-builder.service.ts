import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomValidations } from '@shared/helpers/custom-validations';
import { IGerency } from '@modules/gerency/interfaces/gerency.interface';

@Injectable({
  providedIn: 'root'
})
export class GerencyBuilderService {

  constructor(private _fb: FormBuilder) { }

  public buildGerencyForm(gerency: IGerency): FormGroup {
    return this._fb.group({
      id: [gerency?.id || null],
      name: [
        gerency?.name || null,
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(100)
        ]
      ],
    })
  }
}
