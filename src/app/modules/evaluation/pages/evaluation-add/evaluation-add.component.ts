import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, Validators } from '@angular/forms';

import { IPeriod } from '@modules/period/interfaces/period.interface';
import { EvaluationBuilderService } from '@modules/evaluation/services/evaluation-builder.service';

@Component({
  selector: 'app-evaluation-add',
  templateUrl: './evaluation-add.component.html',
  styleUrls: ['./evaluation-add.component.scss']
})
export class EvaluationAddComponent {

  public evaluationFormGroup: FormGroup;
  public corpGoalsFormGroup: FormGroup;
  public areaGoalsFormGroup: FormGroup;
  public competencesFormGroup: FormGroup;
  public periodObj: IPeriod;

  public step: number = -1;

  public setStep(index: number) {
    this.step = index;
  }

  constructor(
    private _router: Router,
    private _evaluationBuilderService: EvaluationBuilderService
  ) {
    this.evaluationFormGroup = this._evaluationBuilderService.buildEvaluationForm();
    this.corpGoalsFormGroup = this._evaluationBuilderService.builderCorpGoals();
    this.areaGoalsFormGroup = this._evaluationBuilderService.builderCorpGoals();
    this.competencesFormGroup = this._evaluationBuilderService.builderCompetences();
    this.routeValidate();
    this.onChangesValuesForm();
  }

  private routeValidate(): void {
    if (this._router.getCurrentNavigation()?.extras.state) {
      this.periodObj = this._router.getCurrentNavigation()?.extras.state as IPeriod;
      this.evaluationFormGroup.get('periodId')?.setValue(this.periodObj.id);
    } else {
      this._router.navigate([`/period/list`]).then(() => {});
    }
  }

  public onClick(): void {
    console.log("FROM: ",this.competencesFormGroup.controls)
  }

  private onChangesValuesForm(): void {
    this.evaluationFormGroup.valueChanges
      .subscribe(values => {
        if (values?.components[0]?.checked) {
          this.controlsCorpGoalsForm['startDate'].setValidators([Validators.required]);
          this.controlsCorpGoalsForm['endDate'].setValidators([Validators.required]);
        } else {
          this.corpGoalsFormGroup = this._evaluationBuilderService.builderCorpGoals();
        }

        if (values?.components[1]?.checked) {
          this.controlsAreaGoalsForm['startDate'].setValidators([Validators.required]);
          this.controlsAreaGoalsForm['endDate'].setValidators([Validators.required]);
        } else {
          this.areaGoalsFormGroup = this._evaluationBuilderService.builderCorpGoals();
        }

        if (values?.components[2]?.checked) {
          this.controlsCompetencesArr.controls.forEach((comp, i) => {
            comp.get('startDate')?.setValidators([Validators.required]);
            comp.get('endDate')?.setValidators([Validators.required]);
          });
        } else {
          this.competencesFormGroup = this._evaluationBuilderService.builderCompetences();
        }

        // this.items.controls.forEach(c => c.clearValidators());
      })
  }

  /********************************
  ******SHOW CONDITIONAL VIEW******
  ********************************/
  public get showConfigCorpGoals(): any {
    return this.evaluationFormGroup.controls['components'].value[0].checked;
  }

  public get showConfigAreaGoals(): any {
    return this.evaluationFormGroup.controls['components'].value[1].checked;
  }

  public get showConfigCompetences(): any {
    return this.evaluationFormGroup.controls['components'].value[2].checked;
  }
  /********************************
  ****END SHOW CONDITIONAL VIEW****
  ********************************/


  /********************************
  **********CONTROL ACCEESS********
  ********************************/
  public get controlsEvaluationForm(): { [key: string]: AbstractControl } {
    return this.evaluationFormGroup.controls;
  }

  public get controlsCorpGoalsForm(): { [key: string]: AbstractControl } {
    return this.corpGoalsFormGroup.controls;
  }

  public get controlsAreaGoalsForm(): { [key: string]: AbstractControl } {
    return this.areaGoalsFormGroup.controls;
  }

  public get controlsComponentsArr() {
    return this.evaluationFormGroup.get('components') as FormArray;
  }

  public get controlsFormCompetences(): { [key: string]: AbstractControl } {
    return this.competencesFormGroup.controls;
  }

  public get controlsCompetencesArr() {
    return this.competencesFormGroup.get('competences') as FormArray;
  }
  /********************************
  ********END CONTROL ACCEESS******
  ********************************/

}
