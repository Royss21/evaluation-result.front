import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IArea } from '@modules/area/interfaces/area.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';

@Injectable({
  providedIn: 'root'
})
export class AreaBuilderService {

  constructor(private _fb: FormBuilder) { }

  public buildAreaForm(area?: IArea): FormGroup {
    return this._fb.group({
      id: [area?.id || null],
      name: [
        area?.name || null,
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(100)
        ]
      ],
      gerencyId: [
        area?.gerencyId || null,
        [Validators.required]
      ]
    })
  }
}
