import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConstantsGeneral } from '@shared/constants';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { ISubcomponentValue } from '@shared/interfaces/subcomponent-value.interface';
import { ISubcomponent } from '@shared/interfaces/subcomponent.interface';

@Injectable({
  providedIn: 'root',
})
export class AreaObjectivesBuilderService {
  constructor(private _fb: FormBuilder) {}

  public buildAreaObjectivesForm(subcomponent?: ISubcomponent): FormGroup {
    return this._fb.group({
      id: [subcomponent?.id || null],
      name: [
        subcomponent?.name || null,
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(100),
        ],
      ],
      description: [subcomponent?.description || ''],
      areaId: [subcomponent?.areaId || null, [Validators.required]],
      componentId: [ConstantsGeneral.components.areaObjectives],
    });
  }

  public buildSubComponentValueForm(): FormGroup {
    return this._fb.group({
      itemSubcomponents: this._fb.array([]),
    });
  }

  public buildItemsSubComponentValueForm(
    subcomponentValue?: ISubcomponentValue,
    idSubcomponent?: string
  ): FormGroup {
    console.log(subcomponentValue);
    return this._fb.group({
      id: [subcomponentValue?.id || null],
      subcomponentId: [idSubcomponent || null],
      chargeId: [subcomponentValue?.chargeId || null, [Validators.required]],
      chargeName: [subcomponentValue?.chargeName || null],
      relativeWeight: [
        [
          (
            subcomponentValue && (subcomponentValue?.relativeWeight || 0) * 100
          )?.toFixed(0),
        ],
        [Validators.required, Validators.max(100)],
      ],
      minimunPercentage: [
        [
          (
            subcomponentValue &&
            (subcomponentValue?.minimunPercentage || 0) * 100
          )?.toFixed(0),
        ],
        [Validators.required, Validators.max(100)],
      ],
      maximunPercentage: [
        [
          (
            subcomponentValue &&
            (subcomponentValue?.maximunPercentage || 0) * 100
          )?.toFixed(0),
        ],
        [Validators.required, Validators.max(100)],
      ],
    });
  }
}
