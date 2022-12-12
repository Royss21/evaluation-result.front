import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { AbstractControl, FormArray, FormGroup, Validators } from '@angular/forms';

import { ConstantsGeneral } from '@shared/constants';
import { IPeriod } from '@modules/period/interfaces/period.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { EvaluationBuilderService } from '@modules/evaluation/services/evaluation-builder.service';

@Component({
  selector: 'app-evaluation-add',
  templateUrl: './evaluation-add.component.html',
  styleUrls: ['./evaluation-add.component.scss']
})
export class EvaluationAddComponent {

  @ViewChild('accordionEvaluation') accordionEvaluation: MatAccordion;
  @ViewChild('accordionCompetences') accordionCompetences: MatAccordion;

  public title: string = 'Crear nueva evaluación'
  public evaluationFormGroup: FormGroup;
  public corpGoalsFormGroup: FormGroup;
  public areaGoalsFormGroup: FormGroup;
  public competencesFormGroup: FormGroup;
  public periodValues: IPeriod;

  //DATES FOR VALIDATION FORM
  public minDateEvaluation: Date;
  public maxDateEvaluation: Date;
  public minDateEndEvaluation: Date;
  public maxDateEndEvaluation: Date;

  public minDateComponentsEvaluation: Date
  public maxDateComponentsEvaluation: Date

  constructor(
    private _router: Router,
    public _dialog: MatDialog,
    private _evaluationBuilderService: EvaluationBuilderService
  ) {
    this.evaluationFormGroup = this._evaluationBuilderService.buildEvaluationForm();
    this.corpGoalsFormGroup = this._evaluationBuilderService.builderCorpGoals();
    this.areaGoalsFormGroup = this._evaluationBuilderService.builderCorpGoals();
    this.competencesFormGroup = this._evaluationBuilderService.builderCompetences();
    this.routeValidate();
    this._onChangesValuesForm();
  }

  private routeValidate(): void {
    if (this._router.getCurrentNavigation()?.extras.state) {
      this.periodValues = this._router.getCurrentNavigation()?.extras?.state as IPeriod;
      this.evaluationFormGroup.get('periodId')?.setValue(this.periodValues?.id);
    } else
      this._goBack();
  }

  public onClick(): void {

    console.log("VALIDATES: ", this.evaluationFormGroup);

    CustomValidations.marcarFormGroupTouched(this.evaluationFormGroup);
    this.showConfigCorpGoals   && CustomValidations.marcarFormGroupTouched(this.corpGoalsFormGroup);
    this.showConfigAreaGoals   && CustomValidations.marcarFormGroupTouched(this.areaGoalsFormGroup);
    this.showConfigCompetences && CustomValidations.marcarFormGroupTouched(this.competencesFormGroup);

    if (this.evaluationFormGroup.invalid || this.corpGoalsFormGroup.invalid
      || this.areaGoalsFormGroup.invalid || this.competencesFormGroup.invalid )
    {
      if (this.evaluationFormGroup.invalid)
        this.accordionEvaluation.openAll();
      if (this.showConfigCompetences && this.competencesFormGroup.invalid)
        this.accordionCompetences.openAll();

      return;
    }

    // const dialogRef = this._dialog.open(PopupChooseComponent, {
    //   data: ConstantsGeneral.chooseData,
    //   autoFocus: false,
    //   restoreFocus: false
    // });

    // let body = this.periodFormGroup.getRawValue() as IPeriod;

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this._periodService
    //     .create(body)
    //     .pipe(takeUntil(this.unsubscribe$))
    //     .subscribe(() => this.showConfirmMessage());
    //   }
    // });

    console.log("FORM : ",this.evaluationFormGroup)
  }

  private _goBack(): void {
    this._router.navigate([`/period/list`]).then(() => {});
  }

  showConfirmMessage() {
    const dialogRefConfirm = this._dialog.open(PopupConfirmComponent, {
      data: ConstantsGeneral.confirmCreatePopup,
      autoFocus: false
    });

    dialogRefConfirm.afterClosed().subscribe(() => {
      this._goBack();
    });
  }

  private _onChangesValuesForm(): void {
    this._validateDates('evaluation');
    //TODO: ON CHANGES VALUES
    this.controlsEvaluationForm['startDate'].valueChanges.subscribe(value => {
      if (value) {
        this.minDateEndEvaluation = this._toDate(value);
        this.minDateComponentsEvaluation = this._toDate(value);
        this._compareDates('evaluation')
      }
    })

    this.controlsEvaluationForm['endDate'].valueChanges.subscribe(value => {
      if (value) {
        ( this.maxDateComponentsEvaluation = this._toDate(value) );
        this._compareDates('evaluation')
      }
    })

    this.controlsEvaluationForm['components'].valueChanges.subscribe(values => {
      this._validateShowForm(values);
    })
  }

  private _compareDates(nameForm: string) {
    switch (nameForm) {
      case 'evaluation':
        if (this._toDate(this.controlsEvaluationForm['startDate']?.value)?.getTime() > this._toDate(this.controlsEvaluationForm['endDate']?.value)?.getTime()){
          this.controlsEvaluationForm['endDate'].setErrors({'invalidDate': true});
        }

        break
      default:
        break;
    }
  }

  //TODO: VALIDATE DATES
  private _validateDates(typeForm: string): void {
    switch (typeForm) {
      case 'evaluation':
        this.minDateEvaluation = this._toDate(this.periodValues?.startDate);
        this.maxDateEvaluation = this._toDate(this.periodValues?.endDate);
        this.minDateEndEvaluation = this._toDate(this.periodValues?.startDate);
        this.maxDateEndEvaluation = this._toDate(this.periodValues?.endDate);
        break
    }
  }

  private _validateShowForm(values: any): void {
    if (values[0]?.checked)
      this.corpGoalsFormGroup = this._evaluationBuilderService.builderCorpGoals(true);
    else
      this.corpGoalsFormGroup = this._evaluationBuilderService.builderCorpGoals();

    if (values[1]?.checked)
      this.areaGoalsFormGroup = this._evaluationBuilderService.builderCorpGoals(true);
    else
      this.areaGoalsFormGroup = this._evaluationBuilderService.builderCorpGoals();

    if (values[2]?.checked)
      this.competencesFormGroup = this._evaluationBuilderService.builderCompetences(true);
    else
      this.competencesFormGroup = this._evaluationBuilderService.builderCompetences();
  }

  private _toDate(date: Date | string, numberAdd: number = 0): Date {
    const dateLocal = (typeof date === 'string') ? new Date(date) : date;
    if (numberAdd !== 0) {
      dateLocal.setDate(dateLocal.getDate() + (numberAdd))
      return dateLocal;
    } else
      return dateLocal;
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

  public get controlsCompetencesForm(): { [key: string]: AbstractControl } {
    return this.competencesFormGroup.controls;
  }

  public get controlsCompetencesArr(): FormArray {
    return this.competencesFormGroup.get('competences') as FormArray;
  }

  public get controlsEvaluationStagesArr(): FormArray {
    return this.evaluationFormGroup.get('stages') as FormArray;
  }
  /********************************
  ********END CONTROL ACCEESS******
  ********************************/

}
