import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFormula } from '@modules/formula/interfaces/formula.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';

@Injectable({
  providedIn: 'root'
})
export class FormulaModalBuilderService {

  constructor(private _fb: FormBuilder) { }

  public buildForm(): FormGroup {
    return this._fb.group({
      
    });
  }
}
