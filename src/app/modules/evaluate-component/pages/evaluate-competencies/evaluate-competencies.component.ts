import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { ComponentCollaboratorService } from '@core/services/component-collaborator/component-collaborator.service';
import { ICollaboratorInformation } from '@core/interfaces/collaborator-information.interface';
import { IUpdateStatus } from '@modules/evaluate-component/interfaces/update-status.interface';
import { ComponentCollaboratorEvaluateBuilderService } from '@modules/evaluate-component/services/component-collaborator-evaluate-builder.service';
import { ConstantsGeneral } from '@shared/constants';
import { Location } from '@angular/common';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { IComponentCollaboratorEvaluate } from '@modules/evaluate-component/interfaces/component-collaborator-evaluate.interface';

@Component({
  selector: 'app-evaluate-competencies',
  templateUrl: './evaluate-competencies.component.html',
  styleUrls: ['./evaluate-competencies.component.scss']
})
export class EvaluateCompetenciesComponent implements OnInit {

  private _componentCollaboratorId: string;

  infoCollaborator: ICollaboratorInformation;
  stageCurrentId: number;
  evaluateFormGroup: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _componentCollaboratorService: ComponentCollaboratorService,
    private _formBuilder: ComponentCollaboratorEvaluateBuilderService,
    private _location: Location,
    public _dialog: MatDialog,
  ) {
    this.evaluateFormGroup = _formBuilder.buildComponentCollaboratorEvaluateForm(null, ConstantsGeneral.components.competencies);
    this._setInformationCollaborator(null);
   }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this._componentCollaboratorId = params['componentCollaboratorId'];
      this._getEvaluationData();
    });
  }

  get componentCollaboratorDetailsEvaluate() {
    return this.evaluateFormGroup.controls["componentCollaboratorDetailsEvaluate"] as FormArray;
  }

  get isStatusCompleted(){
    return this.infoCollaborator.statusId == ConstantsGeneral.status.Completed;
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.evaluateFormGroup.controls;
  }


  private _getEvaluationData(){
    this._componentCollaboratorService.getEvaluationData(this._componentCollaboratorId)
      .subscribe(data => {

        this.stageCurrentId = data.stageId;
        this.evaluateFormGroup = this._formBuilder.buildComponentCollaboratorEvaluateForm(data, ConstantsGeneral.components.competencies);
        this._setInformationCollaborator(data);

        if(data.componentCollaboratorDetails.length > 0)
        {
          data.componentCollaboratorDetails.forEach(detail => {

            const detailGroup = this._formBuilder.buildComponentCollaboratorDetailEvaluateForm(detail, false);

            detail.componentCollaboratorConducts.forEach(conduct =>
              (detailGroup.controls["componentCollaboratorConductsEvaluate"] as FormArray)
                .push( this._formBuilder.buildComponentCollaboratorConductEvaluateForm(conduct))
            );

            this.componentCollaboratorDetailsEvaluate.push(detailGroup);
          });
        }
      });
  }

  private _setInformationCollaborator(info: ICollaboratorInformation | null){
    this.infoCollaborator = {
      collaboratorName: info?.collaboratorName ?? "",
      hierarchyName: info?.hierarchyName ?? "",
      gerencyName: info?.gerencyName ?? "",
      levelName: info?.levelName ?? "",
      areaName: info?.areaName ?? "",
      chargeName :info?.chargeName ?? "",
      statusId :info?.statusId ?? 0,
      statusName :info?.statusName ?? "",
      documentNumber : info?.documentNumber ?? "",
    };
  }

  private _save(evaluate: IComponentCollaboratorEvaluate){
    this._componentCollaboratorService.evaluate(evaluate)
      .subscribe(() => this._showConfirmMessage());
  }

  private _showConfirmMessage(): void {
    const dialogRefConfirm = this._dialog.open(PopupConfirmComponent, {
      data: ConstantsGeneral.confirmCreatePopup,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRefConfirm.afterClosed().subscribe(() => {
      this._location.back()
    });
  }


  cancel(){
    if(this.infoCollaborator.statusId == ConstantsGeneral.status.InProgress)
    {
      const updateStatus: IUpdateStatus = {
          id: this._componentCollaboratorId,
          statusId: ConstantsGeneral.status.Pending,
          isUpdateComponent: true
      }

      this._componentCollaboratorService.updateStatus(updateStatus)
        .subscribe(() => this._location.back())
    }
    else
      this._location.back();
  }

  confirmFinalizedEvaluation(){

    CustomValidations.marcarFormGroupTouched(this.evaluateFormGroup);

    if(this.evaluateFormGroup.invalid)
      return;

      const evaluateComponent: IComponentCollaboratorEvaluate = { ...this.evaluateFormGroup.getRawValue() };
 
      evaluateComponent.componentCollaboratorDetailsEvaluate.forEach(cc =>
      {
          cc.valueResult = cc.valueResult > 0 ? (cc.valueResult / 100.00) : cc.valueResult;
      });

      const conductsUncheck = evaluateComponent.componentCollaboratorDetailsEvaluate.reduce((acc, el) => {
        return [...acc, ...el.componentCollaboratorConductsEvaluate.reduce((acc2, el2) => ([...acc2, el2.pointValue]), [] as any[])]
      }, [] as any[]);

      if(conductsUncheck.some(s => s === 0))
      {
        const dialogRefConfirm = this._dialog.open(PopupConfirmComponent, {
          data: { 
            ...ConstantsGeneral.confirmCreatePopup, 
            text : 'Aun hay conductas que faltan evaluar.',
            iconColor: 'color-danger',
            icon: 'highlight_off'
          },

          autoFocus: false,
          restoreFocus: false
        });
    
        dialogRefConfirm.afterClosed().subscribe(() => {});

        return;
      }

      const dialogRef = this._dialog.open(PopupChooseComponent, {
        data: ConstantsGeneral.chooseData,
        autoFocus: false,
        restoreFocus: false
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result)
          this._save(evaluateComponent);
      });
  }

}
