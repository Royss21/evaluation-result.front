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

  public step: number = -1;

  public setStep(index: number) {
    this.step = index;
  }

  public competencesFormGroup: FormGroup;
  private _onChangedCompetences: Function = (_value: { startDate: Date, endDate: Date, title: string, description: string, imgSrc: '' }) => {}
  private _onTouchedCompetences: Function = (_value: { startDate: Date, endDate: Date, title: string, description: string, imgSrc: '' }) => {}

  constructor(
    private _evaluationBuilderService: EvaluationBuilderService
  ) {
    this.competencesFormGroup = this._evaluationBuilderService.builderCompetences();
    this.competencesFormGroup.valueChanges
      .subscribe(() => {
        this._onChangedCompetences(this.competencesFormGroup.value);
        this._onTouchedCompetences(this.competencesFormGroup.value);
      })
  }

  public get controlsForm(): { [key: string]: AbstractControl } {
    return this.competencesFormGroup.controls;
  }

  public get competencesArr() {
    return this.competencesFormGroup.get('competences') as FormArray;
  }

  writeValue(obj: { startDate: Date, endDate: Date, title: string, description: string, imgSrc: '' }): void {
    obj && this.competencesFormGroup.setValue(obj);
  }
  registerOnChange(fn: Function): void {
    this._onChangedCompetences = fn;
  }
  registerOnTouched(fn: Function): void {
    this._onTouchedCompetences = fn;
  }

  validate(_control: AbstractControl): ValidationErrors | null {
    //PROPAGAR ERROR AL FORM PADRE
    return this.competencesFormGroup.valid
      ? null
      : { invalidCompetences: true };
  }

}
