import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IParameterRange } from '@modules/parameter-range/interfaces/parameter-range.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';

@Injectable({
  providedIn: 'root'
})
export class ParameterRangeModalBuilderService {

  constructor(private _fb: FormBuilder) { }

  public buildParameterRangeForm(parameterRange?: IParameterRange): FormGroup {
    return this._fb.group({
      id: [parameterRange?.id || null],
      name: [
        parameterRange?.name || '',
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(100)
        ]
      ],
      description: [ 
        parameterRange?.description || '', 
        [Validators.maxLength(200)]
      ]
    });
  }
}
