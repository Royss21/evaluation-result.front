import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConstantsGeneral } from '@shared/constants';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { ISubcomponent } from '@shared/interfaces/subcomponent.interface';

@Injectable({
  providedIn: 'root'
})
export class CompetencesBuilderService {

  constructor(private _fb: FormBuilder) { }

  public buildCompetencesForm(subcomponent?: ISubcomponent): FormGroup {
    return this._fb.group({
      id: [subcomponent?.id || null],
      name: [
        subcomponent?.name || '',
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(100)
        ]
      ],
      description: [
        subcomponent?.description || '',
        [Validators.maxLength(250)]
      ],
      componentId: [
        subcomponent?.componentId || ConstantsGeneral.components.competencies,
        [ Validators.required ]
      ]
    });
  }
}
