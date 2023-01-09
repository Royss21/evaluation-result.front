import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ComponentCollaboratorService } from '@core/services/component-collaborator/component-collaborator.service';
import { ICollaboratorInformation } from '@core/interfaces/collaborator-information.interface';
import { ComponentCollaboratorEvaluateBuilderService } from '@modules/evaluate-component/services/component-collaborator-evaluate-builder.service';
import { Location } from '@angular/common';
import { ConstantsGeneral } from '@shared/constants';
import { IComponentCollaboratorEvaluate } from '@modules/evaluate-component/interfaces/component-collaborator-evaluate.interface';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { IUpdateStatus } from '@modules/evaluate-component/interfaces/update-status.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';


@Component({
  selector: 'app-evaluate-area-objectives',
  templateUrl: './evaluate-area-objectives.component.html',
  styleUrls: ['./evaluate-area-objectives.component.scss']
})
export class EvaluateAreaObjectivesComponent implements OnInit {

  private _componentCollaboratorId: string;

  infoCollaborator: ICollaboratorInformation
  evaluateFormGroup: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _componentCollaboratorService: ComponentCollaboratorService,
    private _formBuilder: ComponentCollaboratorEvaluateBuilderService,
    private _location: Location,
    public _dialog: MatDialog,
  ) {
    this.evaluateFormGroup = _formBuilder.buildComponentCollaboratorEvaluateForm(null, ConstantsGeneral.components.areaObjectives);
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
        this.evaluateFormGroup = this._formBuilder.buildComponentCollaboratorEvaluateForm(data, ConstantsGeneral.components.areaObjectives);
        this._setInformationCollaborator(data);

        if(data.componentCollaboratorDetails.length > 0)
        {
          data.componentCollaboratorDetails.forEach(detail => {
            this.componentCollaboratorDetailsEvaluate.push(this._formBuilder.buildComponentCollaboratorDetailEvaluateForm(detail));
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
      documentNumber : ''
    };
  }

  private _save(evaluate: IComponentCollaboratorEvaluate){
    this._componentCollaboratorService.evaluate(evaluate)
      .subscribe(data => this._showConfirmMessage());
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



  getValueFormControl(index:number, prop: string){
    return this.componentCollaboratorDetailsEvaluate.getRawValue()[index][prop];
  }

  confirmFinalizedEvaluation(){

    CustomValidations.marcarFormGroupTouched(this.evaluateFormGroup);
    console.log(this.evaluateFormGroup)
    if(this.evaluateFormGroup.invalid)
      return;

      const evaluateComponent: IComponentCollaboratorEvaluate = { ...this.evaluateFormGroup.getRawValue() };
      evaluateComponent.componentCollaboratorDetailsEvaluate.forEach(cc =>
      {
          cc.valueResult = cc.valueResult > 0 ? (cc.valueResult / 100.00) : cc.valueResult;
      });

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
