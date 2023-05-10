import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IPeriod } from '../interfaces/period.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';

@Injectable({ providedIn: 'root' })
export class PeriodBuilderService {
  constructor(private _fb: FormBuilder) {}

  public buildPeriodForm(period?: IPeriod): FormGroup {
    return this._fb.group({
      id: [period?.id || 0],
      name: [
        period?.name || null,
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(70),
        ],
      ],
      startDate: [period?.startDate || null, [Validators.required]],
      endDate: [period?.endDate || null, [Validators.required]],
    });
  }
}
