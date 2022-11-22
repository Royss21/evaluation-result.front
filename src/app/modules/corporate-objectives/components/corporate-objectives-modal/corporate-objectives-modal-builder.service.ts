import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICorporateObjectives } from '@modules/corporate-objectives/interfaces/corporate-objectives.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';

@Injectable({
  providedIn: 'root'
})
export class CorporateObjectivesModalBuilderService {

  constructor(private _fb: FormBuilder) { }

  public buildCorporateObjectivesForm(corporateObjectives?: ICorporateObjectives): FormGroup {
    return this._fb.group({
      id: [corporateObjectives?.id || null],
      name: [
        corporateObjectives?.name || '',
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(100)
        ]
      ],
      description: [ corporateObjectives?.description || '', Validators.maxLength(250)],
      areaId:[
        corporateObjectives?.areaId || null,
        [
          Validators.required,
        ]
      ],
      formulaId:[ 
        corporateObjectives?.formulaId || null,
        [
          Validators.required,
        ]
      ]
    });
  }
}
