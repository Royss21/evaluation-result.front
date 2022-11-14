import { Component } from '@angular/core';
import {
  Validator,
  FormGroup,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';

import { EvaluationBuilderService } from '@modules/evaluation/services/evaluation-builder.service';

@Component({
  selector: 'app-config-corp-goals',
  templateUrl: './config-corp-goals.component.html',
  styleUrls: ['./config-corp-goals.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ConfigCorpGoalsComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ConfigCorpGoalsComponent,
      multi: true
    }
  ]
})
export class ConfigCorpGoalsComponent implements ControlValueAccessor, Validator {

  public corpGoalsFormGroup: FormGroup;
  private _onChanged: Function = (_value: { startDate: Date, endDate: Date, isCalc: boolean }) => {}
  private _onTouched: Function = (_value: { startDate: Date, endDate: Date, isCalc: boolean }) => {}


  constructor(
    private _evaluationBuilderService: EvaluationBuilderService
  ) {
    this.corpGoalsFormGroup = this._evaluationBuilderService.builderCorpGoals();
    this.corpGoalsFormGroup.valueChanges
      .subscribe(() => {
        this._onChanged(this.corpGoalsFormGroup.value);
        this._onTouched(this.corpGoalsFormGroup.value);
      })
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.corpGoalsFormGroup.controls;
  }

  writeValue(obj: { startDate: Date, endDate: Date, isCalc: boolean }): void {
    obj && this.corpGoalsFormGroup.setValue(obj);
  }
  registerOnChange(fn: Function): void {
    this._onChanged = fn;
  }
  registerOnTouched(fn: Function): void {
    this._onTouched = fn;
  }

  validate(_control: AbstractControl): ValidationErrors | null {
    //PROPAGAR ERROR AL FORM PADRE
    return this.corpGoalsFormGroup.valid
      ? null
      : { invalidConfigCorpGoals: true }
  }
}
