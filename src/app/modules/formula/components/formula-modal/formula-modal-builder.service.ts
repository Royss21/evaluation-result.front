import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFormula } from '@modules/formula/interfaces/formula.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';

@Injectable({
  providedIn: 'root'
})
export class FormulaModalBuilderService {

  constructor(private _fb: FormBuilder) { }

  public buildFormulaForm(formula?: IFormula): FormGroup {
    return this._fb.group({
      id: [formula?.id || null],
      name: [
        formula?.name || '',
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(100)
        ]
      ],
      formulaReal: [ 
        formula?.formulaReal || '', 
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(500)
        ]
      ],
      description: [ formula?.description || '', Validators.maxLength(250)],
      formulaQuery: [ formula?.formulaQuery || ''],
    });
  }
}
