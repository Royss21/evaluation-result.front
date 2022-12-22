import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { ComponentCollaboratorService } from '@core/services/component-collaborator/component-collaborator.service';
import { ComponentCollaboratorEvaluateBuilderService } from '@modules/evaluate-component/services/component-collaborator-evaluate-builder.service';
import { ConstantsGeneral } from '@shared/constants';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { ICollaboratorInformation } from '@modules/evaluate-component/interfaces/collaborator-information.interface';
import { IComponentCollaboratorEvaluate } from '@modules/evaluate-component/interfaces/component-collaborator-evaluate.interface';
import { Location } from '@angular/common';
import { IUpdateStatus } from '@modules/evaluate-component/interfaces/update-status.interface';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';

@Component({
  selector: 'app-evaluate-corporate-objectives',
  templateUrl: './evaluate-corporate-objectives.component.html',
  styleUrls: ['./evaluate-corporate-objectives.component.scss']
})
export class EvaluateCorporateObjectivesComponent implements OnInit {

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
    this.evaluateFormGroup = _formBuilder.buildComponentCollaboratorEvaluateForm(null, ConstantsGeneral.components.corporateObjectives);
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

  private _getEvaluationData(){
    this._componentCollaboratorService.getEvaluationData(this._componentCollaboratorId)
      .subscribe(data => {
        this.evaluateFormGroup = this._formBuilder.buildComponentCollaboratorEvaluateForm(data, ConstantsGeneral.components.corporateObjectives);
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
      statusName :info?.statusName ?? ""
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
          statusId: ConstantsGeneral.status.Pending
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
    
    if(this.evaluateFormGroup.invalid)
      return;

      const evaluateComponent: IComponentCollaboratorEvaluate = { ...this.evaluateFormGroup.getRawValue() } ; 
      evaluateComponent.componentCollaboratorDetailsEvaluate.forEach(cc => 
      {
          cc.valueResult = cc.valueResult > 0 ? (cc.valueResult / 100.00) : cc.valueResult;
      });
      console.log(evaluateComponent);   
      
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
