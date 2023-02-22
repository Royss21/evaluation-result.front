import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IParameterValue } from '@modules/parameter-range/interfaces/parameter-value.interface';
import { containSpaces } from '@modules/parameter-range/validators/contain-spaces.directive';
import { startWithLetter } from '@modules/parameter-range/validators/start-with.directive';
import { CustomValidations } from '@shared/helpers/custom-validations';

@Injectable({
  providedIn: 'root'
})
export class ParameterValueModalBuilderService {

  constructor(private _fb: FormBuilder) { }

  public buildParameterValueForm(parameterValue?: IParameterValue): FormGroup {

    return this._fb.group({
      id: [parameterValue?.id || null],
      name: [
        parameterValue?.name || '',
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(100),
          startWithLetter('@'),
          containSpaces()
          //Validators.minLength(4)
        ]
      ],
      value: [
        parameterValue?.value || 0,
        [Validators.required]
      ]
    });
  }
}
