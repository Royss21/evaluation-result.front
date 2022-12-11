import { Component } from '@angular/core';
import {
  Validator,
  FormGroup,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormArray
} from '@angular/forms';

import { EvaluationBuilderService } from '@modules/evaluation/services/evaluation-builder.service';

@Component({
  selector: 'app-config-new-period',
  templateUrl: './config-new-period.component.html',
  styleUrls: ['./config-new-period.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ConfigNewPeriodComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ConfigNewPeriodComponent,
      multi: true
    }
  ]
})
export class ConfigNewPeriodComponent implements ControlValueAccessor, Validator {

  public periodFormGroup: FormGroup;
  private _onChanged: Function = (_value: { id: number, name: string, startDate: Date, endDate: Date }) => {}
  private _onTouched: Function = (_value: { id: number, name: string, startDate: Date, endDate: Date }) => {}

  constructor(
    private _evaluationBuilderService: EvaluationBuilderService
  ) {
    this.periodFormGroup = this._evaluationBuilderService.buildEvaluationForm();
    this.periodFormGroup.valueChanges
      .subscribe(() => {
        this._onChanged(this.periodFormGroup.value);
        this._onTouched(this.periodFormGroup.value);
      })
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.periodFormGroup.controls;
  }

  public get controlsComponentsArr() {
    return this.periodFormGroup.get('components') as FormArray;
  }

  writeValue(obj: { id: number, name: string, startDate: Date, endDate: Date }): void {
    obj && this.periodFormGroup.setValue(obj);
  }
  registerOnChange(fn: Function): void {
    this._onChanged = fn;
  }
  registerOnTouched(fn: Function): void {
    this._onTouched = fn;
  }

  validate(_control: AbstractControl): ValidationErrors | null {
    //PROPAGAR ERROR AL FORM PADRE
    return this.periodFormGroup.valid
      ? null
      : { invalidConfigNewPeriod: true }
  }
}
