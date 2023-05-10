import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICharge } from '@modules/charge/interfaces/charge.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';

@Injectable({
  providedIn: 'root',
})
export class ChargeBuilderService {
  constructor(private _fb: FormBuilder) {}

  public buildChargeForm(charge: ICharge): FormGroup {
    return this._fb.group({
      id: [charge?.id || null],
      name: [
        charge?.name || null,
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(100),
        ],
      ],
      hierarchyId: [charge?.hierarchyId || null, [Validators.required]],
      areaId: [charge?.areaId || null, [Validators.required]],
    });
  }
}
