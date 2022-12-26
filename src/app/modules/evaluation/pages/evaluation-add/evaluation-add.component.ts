import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

import { ConstantsGeneral } from '@shared/constants';
import { IPeriod } from '@modules/period/interfaces/period.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { EvaluationBuilderService } from '@modules/evaluation/services/evaluation-builder.service';
import { Location } from '@angular/common';
import { IEvaluationCreate } from '@modules/evaluation/interfaces/evaluation-create.interface';
import { EvaluationService } from '@core/services/evaluation/evaluation.service';

@Component({
  selector: 'app-evaluation-add',
  templateUrl: './evaluation-add.component.html',
  styleUrls: ['./evaluation-add.component.scss']
})
export class EvaluationAddComponent {

  @ViewChild('accordionEvaluation') accordionEvaluation: MatAccordion;
  @ViewChild('accordionCompetences') accordionCompetences: MatAccordion;

  competenceId: number = ConstantsGeneral.components.competencies;
  stagesEvaluation: number[] = [ConstantsGeneral.stages.feedback, ConstantsGeneral.stages.approval];
  stagesCompetence: number[] = [ConstantsGeneral.stages.evaluation, ConstantsGeneral.stages.calibration];

  title: string = 'Crear nueva evaluación'
  evaluationFormGroup: FormGroup;
  corpGoalsFormGroup: FormGroup;
  areaGoalsFormGroup: FormGroup;
  competencesFormGroup: FormGroup;
  periodValues: IPeriod;
  minDateEvaluation: Date;
  maxDateEvaluation: Date;
  minDateComponentsEvaluation: Date
  maxDateComponentsEvaluation: Date

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _evaluationBuilderService: EvaluationBuilderService,
    private _location: Location,
    private _evaluationService: EvaluationService
  ) {
    this.evaluationFormGroup = this._evaluationBuilderService.buildEvaluationForm();
    // this.corpGoalsFormGroup = this._evaluationBuilderService.builderCorpGoals();
    // this.areaGoalsFormGroup = this._evaluationBuilderService.builderCorpGoals();
    // this.competencesFormGroup = this._evaluationBuilderService.builderCompetences();
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


  get evaluationComponents() : FormArray {
    return this.evaluationFormGroup.get("evaluationComponents") as FormArray
  }

  get evaluationComponentStages() : FormArray {
    return this.evaluationFormGroup.get("evaluationComponentStages") as FormArray
  }

  get one(): FormGroup{
    return this.evaluationComponents.controls[0] as FormGroup;
  }

  private _goBack(): void {
    this._location.back();
  }

  private _save(evaluation : IEvaluationCreate){
    this._evaluationService.create(evaluation)
      .subscribe(data =>{
        console.log(data);
        this._goBack();
      })
  }

  //TODO: ON CHANGES VALUES
  private _onChangesValuesForm(): void {
    this.minDateEvaluation = this._toDate(this.periodValues?.startDate);
    this.maxDateEvaluation = this._toDate(this.periodValues?.endDate);

    this.controlsEvaluationForm['startDate'].valueChanges.subscribe(value => {
      if (value) {
        this.minDateComponentsEvaluation = this._toDate(value);
        this._compareDates('evaluation')
      }
    });

    this.controlsEvaluationForm['endDate'].valueChanges.subscribe(value => {
      if (value) {
        this.maxDateComponentsEvaluation = this._toDate(value);
        this._compareDates('evaluation')
      }
    });

    // this.controlsEvaluationForm['components'].valueChanges.subscribe(values => {
    //   this._validateShowForm(values);
    //   this.controlsCorpGoalsForm['startDate'].valueChanges.subscribe(value => {
    //     value && this._compareDates('corpGoals')
    //   });

    //   this.controlsCorpGoalsForm['endDate'].valueChanges.subscribe(value => {
    //     value && this._compareDates('corpGoals')
    //   });

    //   this.controlsAreaGoalsForm['startDate'].valueChanges.subscribe(value => {
    //     value && this._compareDates('areaGoals')
    //   });

    //   this.controlsAreaGoalsForm['endDate'].valueChanges.subscribe(value => {
    //     value && this._compareDates('areaGoals')
    //   });

    //   this.controlsCompetencesArr.valueChanges.subscribe(value => {
    //     value &&  this._compareDates('competences');
    //   })
    // });
  }

  private _compareDates(nameForm: string) {
    switch (nameForm) {
      case 'evaluation':
        if (this._toDate(this.controlsEvaluationForm['startDate']?.value)?.getTime() >= this._toDate(this.controlsEvaluationForm['endDate']?.value)?.getTime())
          this.controlsEvaluationForm['endDate'].setErrors({'invalidDate': true});
        else
          this.controlsEvaluationForm['endDate'].setErrors(null);
        break

      case 'corpGoals':
        if (this._toDate(this.controlsCorpGoalsForm['startDate']?.value)?.getTime() >= this._toDate(this.controlsCorpGoalsForm['endDate']?.value)?.getTime())
          this.controlsCorpGoalsForm['endDate'].setErrors({'invalidDate': true});
        else
          this.controlsCorpGoalsForm['endDate'].setErrors(null);
        break

      case 'areaGoals':
        if (this._toDate(this.controlsAreaGoalsForm['startDate']?.value)?.getTime() >= this._toDate(this.controlsAreaGoalsForm['endDate']?.value)?.getTime())
          this.controlsAreaGoalsForm['endDate'].setErrors({'invalidDate': true});
        else
          this.controlsAreaGoalsForm['endDate'].setErrors(null);
        break
      case 'competences':
        this.controlsCompetencesArr.controls.forEach(comp => {
          if (this._toDate(comp.get('startDate')?.value)?.getTime() >= this._toDate(comp.get('endDate')?.value)?.getTime()) {
            comp.get('endDate')?.setErrors({'invalidDate': true});
          } else
            comp.get('endDate')?.setErrors(null);
        });
        break
      default:
        break;
    }
  }

  // private _validateShowForm(values: any): void {
  //   if (values[0]?.checked)
  //     this.corpGoalsFormGroup = this._evaluationBuilderService.builderCorpGoals(true);
  //   else
  //     this.corpGoalsFormGroup = this._evaluationBuilderService.builderCorpGoals();

  //   if (values[1]?.checked)
  //     this.areaGoalsFormGroup = this._evaluationBuilderService.builderCorpGoals(true);
  //   else
  //     this.areaGoalsFormGroup = this._evaluationBuilderService.builderCorpGoals();

  //   if (values[2]?.checked)
  //     this.competencesFormGroup = this._evaluationBuilderService.builderCompetences(true);
  //   else
  //     this.competencesFormGroup = this._evaluationBuilderService.builderCompetences();
  // }

  private _toDate(date: Date | string, numberAdd: number = 0): Date {
    const dateLocal = (typeof date === 'string') ? new Date(date) : date;
    if (numberAdd !== 0) {
      dateLocal.setDate(dateLocal.getDate() + (numberAdd))
      return dateLocal;
    } else
      return dateLocal;
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

  confirmSave(): void {

    console.log(this.evaluationFormGroup.valid);
    console.log(this.evaluationFormGroup.getRawValue());

    CustomValidations.marcarFormGroupTouched(this.evaluationFormGroup);

    if(this.evaluationFormGroup.invalid)
      return;

    const evaluationCreate: IEvaluationCreate = { ...this.evaluationFormGroup.getRawValue() } ;

    evaluationCreate.evaluationComponents = [ ...evaluationCreate.evaluationComponents.filter(ec => ec.checked)];

    if(!evaluationCreate.evaluationComponents.some(ec => ec.componentId === ConstantsGeneral.components.competencies))
      evaluationCreate.evaluationComponentStages = [ ...evaluationCreate.evaluationComponentStages.filter(s => s.componentId !== ConstantsGeneral.components.competencies)];
    else{
      evaluationCreate.evaluationComponents = evaluationCreate.evaluationComponents
        .map(ec => ec.componentId === ConstantsGeneral.components.competencies
            ? {
                ...ec,
                startDate: evaluationCreate.evaluationComponentStages
                  .find(s => s.componentId === ConstantsGeneral.components.competencies && s.stageId === ConstantsGeneral.stages.evaluation)?.startDate || null,
                endDate: evaluationCreate.evaluationComponentStages
                  .find(s => s.componentId === ConstantsGeneral.components.competencies && s.stageId === ConstantsGeneral.stages.calibration)?.endDate || null
              }
            : ec);
    }

    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this._save(evaluationCreate);
    });
    // this.showConfigCorpGoals   && CustomValidations.marcarFormGroupTouched(this.corpGoalsFormGroup);
    // this.showConfigAreaGoals   && CustomValidations.marcarFormGroupTouched(this.areaGoalsFormGroup);
    // this.showConfigCompetences && CustomValidations.marcarFormGroupTouched(this.competencesFormGroup);

    // if (this.evaluationFormGroup.invalid || this.corpGoalsFormGroup.invalid
    //   || this.areaGoalsFormGroup.invalid || this.competencesFormGroup.invalid )
    // {
    //   if (this.evaluationFormGroup.invalid)
    //     this.accordionEvaluation.openAll();
    //   if (this.showConfigCompetences && this.competencesFormGroup.invalid)
    //     this.accordionCompetences.openAll();

    //   return;
    // }

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

    //console.log("FORM : ",this.evaluationFormGroup)
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
