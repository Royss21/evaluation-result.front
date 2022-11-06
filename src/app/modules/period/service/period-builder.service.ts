import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IPeriod } from '../interfaces/period.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';

@Injectable({ providedIn: 'root' })
export class PeriodService {

  constructor(private _fb: FormBuilder) { }

  public buildPeriodForm(period?: IPeriod): FormGroup {
    return this._fb.group({
      id: [period?.id || 0],
      name: [
        period?.name || null,
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(70)
        ]
      ],
      dateStart: [
        (period?.dateStart || null),
        [Validators.required]
      ],
      dateEnd: [
        (period?.dateEnd || null),
        [Validators.required]
      ]
    });
  }
}
