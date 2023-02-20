import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConstantsGeneral } from '@shared/constants';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { IConductByLevel, IConductBySubcomponent } from '@shared/interfaces/conduct.interface';
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

  public buildConductForm(): FormGroup {
    return this._fb.group({
      itemsConduct: this._fb.array([])
    });
  }

  public buildItemsConductForm(conduct?: IConductBySubcomponent): FormGroup {
    return this._fb.group({
      id: [ conduct?.id || null ],
      levelId: [ conduct?.levelId || null ],
      description: [ conduct?.description || null, [ Validators.required ] ],
      subcomponentId: [ conduct?.subcomponentId || null ],
    });
  }
}
