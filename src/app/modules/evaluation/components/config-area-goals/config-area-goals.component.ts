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
  selector: 'app-config-area-goals',
  templateUrl: './config-area-goals.component.html',
  styleUrls: ['./config-area-goals.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ConfigAreaGoalsComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ConfigAreaGoalsComponent,
      multi: true
    }
  ]
})
export class ConfigAreaGoalsComponent implements ControlValueAccessor, Validator {

  public competencesFormGroup: FormGroup;
  private _onChanged: Function = (_value: { startDate: Date, endDate: Date }) => {}
  private _onTouched: Function = (_value: { startDate: Date, endDate: Date }) => {}


  constructor(
    private _evaluationBuilderService: EvaluationBuilderService
  ) {
    this.competencesFormGroup = this._evaluationBuilderService.builderCorpGoals();
    this.competencesFormGroup.valueChanges
      .subscribe(() => {
        this._onChanged(this.competencesFormGroup.value);
        this._onTouched(this.competencesFormGroup.value);
      })
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.competencesFormGroup.controls;
  }

  writeValue(obj: { startDate: Date, endDate: Date, isCalc: boolean }): void {
    obj && this.competencesFormGroup.setValue(obj);
  }
  registerOnChange(fn: Function): void {
    this._onChanged = fn;
  }
  registerOnTouched(fn: Function): void {
    this._onTouched = fn;
  }

  validate(_control: AbstractControl): ValidationErrors | null {
    //PROPAGAR ERROR AL FORM PADRE
    return this.competencesFormGroup.valid
      ? null
      : { invalidConfigCorpGoals: true }
  }

}
