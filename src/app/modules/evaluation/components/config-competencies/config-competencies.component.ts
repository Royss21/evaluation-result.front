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
  selector: 'app-config-competencies',
  templateUrl: './config-competencies.component.html',
  styleUrls: ['./config-competencies.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ConfigCompetenciesComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ConfigCompetenciesComponent,
      multi: true
    }
  ]
})
export class ConfigCompetenciesComponent implements ControlValueAccessor, Validator {

  public evaluationStageFormGroup: FormGroup;
  public calibrationStageFormGroup: FormGroup;
  private _onChangedEvaluation: Function = (_value: { startDate: Date, endDate: Date }) => {}
  private _onTouchedEvaluation: Function = (_value: { startDate: Date, endDate: Date }) => {}

  private _onChangedCalibration: Function = (_value: { startDate: Date, endDate: Date }) => {}
  private _onTouchedCalibration: Function = (_value: { startDate: Date, endDate: Date }) => {}



  constructor(
    private _evaluationBuilderService: EvaluationBuilderService
  ) {
    this.evaluationStageFormGroup = this._evaluationBuilderService.builderCorpGoals();
    this.evaluationStageFormGroup.valueChanges
      .subscribe(() => {
        this._onChangedEvaluation(this.evaluationStageFormGroup.value);
        this._onTouchedEvaluation(this.evaluationStageFormGroup.value);
      })
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.evaluationStageFormGroup.controls;
  }

  writeValue(obj: { startDate: Date, endDate: Date, isCalc: boolean }): void {
    obj && this.evaluationStageFormGroup.setValue(obj);
  }
  registerOnChange(fn: Function): void {
    this._onChangedEvaluation = fn;
  }
  registerOnTouched(fn: Function): void {
    this._onTouchedEvaluation = fn;
  }

  validate(_control: AbstractControl): ValidationErrors | null {
    //PROPAGAR ERROR AL FORM PADRE
    return this.evaluationStageFormGroup.valid
      ? null
      : { invalidConfigCorpGoals: true }
  }

}
