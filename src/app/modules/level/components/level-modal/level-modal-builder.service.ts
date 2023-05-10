import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ILevel } from '@modules/level/interfaces/level.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';

@Injectable({
  providedIn: 'root',
})
export class LevelModalBuilderService {
  constructor(private _fb: FormBuilder) {}

  public buildLevelForm(level?: ILevel): FormGroup {
    return this._fb.group({
      id: [level?.id || null],
      name: [
        level?.name || '',
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(100),
        ],
      ],
      description: [level?.description || ''],
    });
  }
}
