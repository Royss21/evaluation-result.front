import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { ConstantsGeneral } from '@shared/constants';
import { IPeriod } from '@modules/period/interfaces/period.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { EvaluationBuilderService } from '@modules/evaluation/services/evaluation-builder.service';
import { Location } from '@angular/common';
import { IEvaluationComponent, IEvaluationCreate } from '@modules/evaluation/interfaces/evaluation-create.interface';
import { EvaluationService } from '@core/services/evaluation/evaluation.service';
import { PeriodService } from '@core/services/period/period.service';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';

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
  periodCurrent: IPeriod;
  minDateEvaluation: Date;
  maxDateEvaluation: Date;

  minDateComponentsEvaluation: Date;
  maxDateComponentsEvaluation: Date;
  startDatePeriod: Date;
  endDatePeriod: Date;
  periodId: number;

  startDateStageCalibration: Date;
  startDateStageApproval: Date;
  disableDate: boolean = false;

  evaluationId : string | null =  null;
  textButton: string = 'Crear evaluación';

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _evaluationBuilderService: EvaluationBuilderService,
    private _location: Location,
    private _evaluationService: EvaluationService,
    private _periodService: PeriodService,
    private _route: ActivatedRoute
  ) {
    this.evaluationFormGroup = this._evaluationBuilderService.buildEvaluationForm();
    this._getCurrentDatesPeriod();
    this._onChangesValuesForm();
    this._route.params.subscribe(params => {
      this.evaluationId = params["id"];

      if(this.evaluationId){
        this.textButton = 'Actualizar evaluación'
        this._evaluationService.getDatesComponentes(this.evaluationId ?? "")
          .subscribe(data =>{

            this.controlsEvaluationForm['name'].setValue(data.name);
            this.controlsEvaluationForm['weight'].setValue(data.weight);
            this.controlsEvaluationForm['startDate'].setValue(this._toDate(data.startDate));
            this.controlsEvaluationForm['endDate'].setValue(this._toDate(data.endDate));

            data.componentStagesDates.forEach(c =>{

              if(!c.componentId){
                if(c.stageId === ConstantsGeneral.stages.feedback){
                  this.stageFeedback.get('startDate')?.setValue(this._toDate(c.startDate));
                  this.stageFeedback.get('endDate')?.setValue(this._toDate(c.endDate));
                }else if(c.stageId === ConstantsGeneral.stages.approval){
                  this.stageApproval.get('startDate')?.setValue(this._toDate(c.startDate));
                  this.stageApproval.get('endDate')?.setValue(this._toDate(c.endDate));
                }
              }

              if(c.componentId === ConstantsGeneral.components.corporateObjectives){
                this.corpGoal.get('checked')?.setValue(true);
                this.corpGoal.get('startDate')?.setValue(this._toDate(c.startDate));
                this.corpGoal.get('endDate')?.setValue(this._toDate(c.endDate));
              }
              else if(c.componentId === ConstantsGeneral.components.areaObjectives){
                this.areaGoal.get('checked')?.setValue(true);
                this.areaGoal.get('startDate')?.setValue(this._toDate(c.startDate));
                this.areaGoal.get('endDate')?.setValue(this._toDate(c.endDate));
              }
              else if(c.componentId === ConstantsGeneral.components.competencies){
                this.competencesGoal.get('checked')?.setValue(true);

                if(c.stageId === ConstantsGeneral.stages.evaluation){
                  this.stageEvaluation.get('startDate')?.setValue(this._toDate(c.startDate));
                  this.stageEvaluation.get('endDate')?.setValue(this._toDate(c.endDate));
                }else if(c.stageId === ConstantsGeneral.stages.calibration){
                  this.stageCalibration.get('startDate')?.setValue(this._toDate(c.startDate));
                  this.stageCalibration.get('endDate')?.setValue(this._toDate(c.endDate));
                }
              }
            });
          })
      }
    })
  }

  private _getCurrentDatesPeriod(): void {
      this._periodService.getCurrentDatePeriod()
        .subscribe(period => {
          this.periodCurrent = period;
          this.startDatePeriod = period?.startDate;
          this.endDatePeriod = period?.endDate;
          this.minDateEvaluation = this._toDate(period?.startDate);
          this.maxDateEvaluation = this._toDate(period?.endDate);
        });
  }

  get isEvaluationEdit(){
    return this.evaluationId !== null;
  }

  get controlsEvaluationForm(): { [key: string]: AbstractControl } {
    return this.evaluationFormGroup.controls;
  }

  get evaluationComponents() : FormArray {
    return this.evaluationFormGroup.get("evaluationComponents") as FormArray
  }

  get evaluationComponentStages() : FormArray {
    return this.evaluationFormGroup.get("evaluationComponentStages") as FormArray
  }

  get corpGoal() : FormGroup {
    return this.evaluationComponents.controls[0] as FormGroup
  }

  get areaGoal() : FormGroup {
    return this.evaluationComponents.controls[1] as FormGroup
  }

  get competencesGoal() : FormGroup {
    return this.evaluationComponents.controls[2] as FormGroup
  }

  get stageFeedback() : FormGroup {
    return this.evaluationComponentStages.controls[0] as FormGroup
  }

  get stageApproval() : FormGroup {
    return this.evaluationComponentStages.controls[1] as FormGroup
  }

  get stageEvaluation() : FormGroup {
    return this.evaluationComponentStages.controls[2] as FormGroup
  }

  get stageCalibration() : FormGroup {
    return this.evaluationComponentStages.controls[3] as FormGroup
  }

  get endDateMax(){
    var endDate =  [
      this.corpGoal.get('endDate')?.value,
      this.areaGoal.get('endDate')?.value,
      this.stageCalibration.get('endDate')?.value,
      this._toDate(this.startDatePeriod)
    ].reduce((a, b) => {
      return a > b ? a : b;
    });

    var ff = new Date(endDate);
    ff?.setDate(ff.getDate() + 1);
    return ff;
  }

  private _goBack(): void {
    this._location.back();
  }

  private _save(evaluation : IEvaluationCreate){
    
    if(this.evaluationId)
      this._evaluationService.update(evaluation, this.evaluationId)
      .subscribe(evaluation =>{
        this._showConfirmMessage(evaluation.id);
      })
    else
      this._evaluationService.create(evaluation)
        .subscribe(evaluation =>{
          this._showConfirmMessage(evaluation.id);
      })
  }
  

  private _showConfirmMessage(evaluationId: string): void {

    const dataConfirm = {...ConstantsGeneral.confirmCreatePopup};

    if(this.evaluationId)
      dataConfirm.text = "Se actualizó la evaluación correctamente";

    const dialogRefConfirm = this._dialog.open(PopupConfirmComponent, {
      data: {
        icon: 'check_circle',
        iconColor: 'color-primary',
        text: this.evaluationId  
          ? "Se actualizó la evaluación exitosamente"
          : 'Se ha creado la evaluación exitosamente',
        buttonLabelAccept: 'Aceptar'
      },
      autoFocus: false,
      restoreFocus: false
    });

    dialogRefConfirm.afterClosed().subscribe(() => {
      this._router.navigateByUrl(`/evaluation/${evaluationId}/detail`);
    });
  }

  //TODO: ON CHANGES VALUES
  private _onChangesValuesForm(): void {

    this.controlsEvaluationForm['startDate'].valueChanges.subscribe(value => {
      if (value) {
        this.minDateComponentsEvaluation = this._toDate(value);
        this._compareDates('evaluation')
      }
      else
        this.minDateEvaluation = this.startDatePeriod;
    });

    this.controlsEvaluationForm['endDate'].valueChanges.subscribe(value => {
      if (value) {
        this.maxDateComponentsEvaluation = this._toDate(value);
        this._compareDates('evaluation')
      }
      else
        this.maxDateComponentsEvaluation = this.endDatePeriod;
    });

    this.evaluationComponents.valueChanges.subscribe(value =>{
      if(value.some((item: any) => item.checked))
      {
        this.stageFeedback.get('startDate')?.enable();
        this.stageFeedback.get('endDate')?.enable();
      }
      else
      {
        this.stageFeedback.get('startDate')?.disable();
        this.stageFeedback.get('endDate')?.disable();
        this.stageApproval.get('startDate')?.disable();
        this.stageApproval.get('endDate')?.disable();
      }
    });

    //VALUE CHANGES CORPORATIVE GOAL

    this.corpGoal.get('checked')?.valueChanges.subscribe(value => {
      if(value)
      {
        this.corpGoal.get('startDate')?.addValidators(Validators.required);
        this.corpGoal.get('endDate')?.addValidators(Validators.required);
      }
      else
      {
        this.corpGoal.get('startDate')?.clearValidators();
        this.corpGoal.get('endDate')?.clearValidators();
        this.corpGoal.get('startDate')?.setValue(null);
        this.corpGoal.get('endDate')?.setValue(null);
      }
    });

    this.corpGoal.get('startDate')?.valueChanges.subscribe(value => {
      if(value)
        this._compareDates('corpGoals');
    });

    this.corpGoal.get('endDate')?.valueChanges.subscribe(value => {
      if(value)
        this._compareDates('corpGoals');
    });

    //VALUE CHANGES AREA GOAL

    this.areaGoal.get('checked')?.valueChanges.subscribe(value => {
      if(value)
      {
        this.areaGoal.get('startDate')?.addValidators(Validators.required);
        this.areaGoal.get('endDate')?.addValidators(Validators.required);
      }
      else
      {
        this.areaGoal.get('startDate')?.clearValidators();
        this.areaGoal.get('endDate')?.clearValidators();
        this.areaGoal.get('startDate')?.setValue(null);
        this.areaGoal.get('endDate')?.setValue(null);
      }
    });


    this.areaGoal.get('startDate')?.valueChanges.subscribe(value => {
      if(value)
        this._compareDates('areaGoals');
    });

    this.areaGoal.get('endDate')?.valueChanges.subscribe(value => {
      if(value)
        this._compareDates('areaGoals');
    });


    //VALUE CHANGES COMPETENCES GOAL

    this.competencesGoal.get('checked')?.valueChanges.subscribe(value => {

      if(value)
      {
        this.stageEvaluation.get('startDate')?.addValidators(Validators.required);
        this.stageEvaluation.get('endDate')?.addValidators(Validators.required);

        this.stageCalibration.get('startDate')?.addValidators(Validators.required);
        this.stageCalibration.get('endDate')?.addValidators(Validators.required);
      }
      else{
        this.stageEvaluation.get('startDate')?.clearValidators();
        this.stageEvaluation.get('endDate')?.clearValidators();
        this.stageEvaluation.get('startDate')?.setValue(null);
        this.stageEvaluation.get('endDate')?.setValue(null);

        this.stageCalibration.get('startDate')?.clearValidators();
        this.stageCalibration.get('endDate')?.clearValidators();
        this.stageCalibration.get('startDate')?.setValue(null);
        this.stageCalibration.get('endDate')?.setValue(null);
      }
    });

    //VALUE CHANGE STAGE APPROVAL

    this.stageApproval.get('startDate')?.disable();
    this.stageApproval.get('endDate')?.disable();

    this.stageApproval.get('startDate')?.valueChanges.subscribe(value => {
      if(value)
        this._compareDates('stageApproval');
    });

    this.stageApproval.get('endDate')?.valueChanges.subscribe(value => {
      if(value)
        this._compareDates('stageApproval');
    });

    //VALUE CHANGE STAGE FEEDBACK

    this.stageFeedback.get('startDate')?.disable();
    this.stageFeedback.get('endDate')?.disable();

    this.stageFeedback.get('startDate')?.valueChanges.subscribe(value => {
      if(value)
        this._compareDates('stageFeedback');
    });

    this.stageFeedback.get('endDate')?.valueChanges.subscribe(value => {
      if(value){

        const startDate = new Date(value);
        startDate?.setDate(startDate.getDate() + 1);

        this.startDateStageApproval = startDate;
        this._compareDates('stageFeedback');
        this.stageApproval.get('startDate')?.enable();
        this.stageApproval.get('endDate')?.enable();
      }
      else{
        this.stageApproval.get('startDate')?.disable();
        this.stageApproval.get('endDate')?.disable();
        this.stageApproval.get('startDate')?.setValue(null);
        this.stageApproval.get('endDate')?.setValue(null);
      }
    });

    //VALUE CHANGE STAGE EVALUATION

    this.stageEvaluation.get('startDate')?.valueChanges.subscribe(value => {
      if(value)
        this._compareDates('stageEvaluation');
    });

    this.stageEvaluation.get('endDate')?.valueChanges.subscribe(value => {
      if(value){

        const startDate = new Date(value);
        startDate?.setDate(startDate.getDate() + 1);

        this._compareDates('stageEvaluation');
        this.startDateStageCalibration = startDate;
        this.stageCalibration.get('startDate')?.enable();
        this.stageCalibration.get('endDate')?.enable();
      }
      else{
        this.stageCalibration.get('startDate')?.disable();
        this.stageCalibration.get('endDate')?.disable();
        this.stageCalibration.get('startDate')?.setValue(null);
        this.stageCalibration.get('endDate')?.setValue(null);
      }
    });

    //VALUE CHANGE STAGE CALIBRATION

    this.stageCalibration.get('startDate')?.disable();
    this.stageCalibration.get('endDate')?.disable();
    this.stageCalibration.get('startDate')?.valueChanges.subscribe(value => {
      if(value)
        this._compareDates('stageCalibration');
    });

    this.stageCalibration.get('endDate')?.valueChanges.subscribe(value => {
      if(value)
        this._compareDates('stageCalibration');
    });

  }

  private _compareDates(nameForm: string) {
    switch (nameForm) {
      case 'evaluation':

        if (this._toDate(this.controlsEvaluationForm['startDate']?.value)?.getTime() >= this._toDate(this.controlsEvaluationForm['endDate']?.value)?.getTime())
          this.controlsEvaluationForm['endDate'].setErrors({'invalidDate': true});
        else
          this.controlsEvaluationForm['endDate'].setErrors(null);

        break;
      case 'corpGoals':

        const startDateCorp = this.corpGoal.get('startDate')?.value;
        const endDateCorp = this.corpGoal.get('endDate')?.value;
        if (this._toDate(startDateCorp)?.getTime() >= this._toDate(endDateCorp)?.getTime())
          this.corpGoal.get('endDate')?.setErrors({'invalidDate': true});
        else
          this.corpGoal.get('endDate')?.setErrors(null);

        break;
      case 'areaGoals':

        const startDateArea = this.areaGoal.get('startDate')?.value;
        const endDateArea = this.areaGoal.get('endDate')?.value;
        if (this._toDate(startDateArea)?.getTime() >= this._toDate(endDateArea)?.getTime())
          this.areaGoal.get('endDate')?.setErrors({'invalidDate': true});
        else
          this.areaGoal.get('endDate')?.setErrors(null);

        break;
      case 'stageApproval':

        const startDateAproval = this.stageApproval.get('startDate')?.value;
        const endDateAproval = this.stageApproval.get('endDate')?.value;
        if (this._toDate(startDateAproval)?.getTime() >= this._toDate(endDateAproval)?.getTime())
          this.stageApproval.get('endDate')?.setErrors({'invalidDate': true});
        else
          this.stageApproval.get('endDate')?.setErrors(null);

        break;
      case 'stageFeedback':

        const startDateFeedback = this.stageFeedback.get('startDate')?.value;
        const endDateFeedback = this.stageFeedback.get('endDate')?.value;
        if (this._toDate(startDateFeedback)?.getTime() >= this._toDate(endDateFeedback)?.getTime())
          this.stageFeedback.get('endDate')?.setErrors({'invalidDate': true});
        else
          this.stageFeedback.get('endDate')?.setErrors(null);

        break;

      case 'stageEvaluation':

        const startDateEvaluation = this.stageEvaluation.get('startDate')?.value;
        const endDateEvaluation = this.stageEvaluation.get('endDate')?.value;
        if (this._toDate(startDateEvaluation)?.getTime() >= this._toDate(endDateEvaluation)?.getTime())
          this.stageEvaluation.get('endDate')?.setErrors({'invalidDate': true});
        else
          this.stageEvaluation.get('endDate')?.setErrors(null);

      break;

      case 'stageCalibration':

        const startDateCalibration = this.stageCalibration.get('startDate')?.value;
        const endDateCalibration = this.stageCalibration.get('endDate')?.value;
        if (this._toDate(startDateCalibration)?.getTime() >= this._toDate(endDateCalibration)?.getTime())
          this.stageCalibration.get('endDate')?.setErrors({'invalidDate': true});
        else
          this.stageCalibration.get('endDate')?.setErrors(null);

      break;

      default:
        break;
    }
  }

  private _toDate(date: Date | string, numberAdd: number = 0): Date {
    const dateLocal = (typeof date === 'string') ? new Date(date) : date;
    if (numberAdd !== 0) {
      dateLocal.setDate(dateLocal.getDate() + (numberAdd))
      return dateLocal;
    } else
      return dateLocal;
  }

  confirmSave(): void {
    const evaluationCreate: IEvaluationCreate = { ...this.evaluationFormGroup.getRawValue() } ;
    evaluationCreate.evaluationComponents = [ ...evaluationCreate.evaluationComponents.filter(ec => ec.checked)];
    evaluationCreate.periodId = this.periodCurrent.id;

    CustomValidations.marcarFormGroupTouched(this.evaluationFormGroup);

    const dataPopup = { ...ConstantsGeneral.confirmCreatePopup };
    dataPopup.iconColor = 'color-danger';
    dataPopup.icon = 'highlight_off'

    if(evaluationCreate.evaluationComponents.length <= 0)
    {
      dataPopup.text = 'Debe seleccionar un componente para crear la evaluación';
      const dialogRefConfirm = this._dialog.open(PopupConfirmComponent, {
        data: dataPopup,
        autoFocus: false
      });

      dialogRefConfirm.afterClosed().subscribe(() => {});
      return;
    }

    if(this.evaluationFormGroup.invalid)
      return;

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
  }

}
