import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { ComponentCollaboratorService } from '@core/services/component-collaborator/component-collaborator.service';
import { ComponentCollaboratorEvaluateBuilderService } from '@modules/evaluate-component/services/component-collaborator-evaluate-builder.service';
import { IComponentCollaborator, IComponentCollaboratorEvaluate } from '@modules/evaluate-component/interfaces/component-collaborator.interface';
import { ConstantsGeneral } from '@shared/constants';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { ICollaboratorInformation } from '@modules/evaluate-component/interfaces/collaborator-information.interface';

@Component({
  selector: 'app-evaluate-corporate-objectives',
  templateUrl: './evaluate-corporate-objectives.component.html',
  styleUrls: ['./evaluate-corporate-objectives.component.scss']
})
export class EvaluateCorporateObjectivesComponent implements OnInit {

  private _componentCollaboratorId: string;
  
  collaboratorInfo: ICollaboratorInformation
  evaluateFormGroup: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _componentCollaboratorService: ComponentCollaboratorService,
    private _formBuilder: ComponentCollaboratorEvaluateBuilderService,
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
    this.collaboratorInfo = {
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
      .subscribe(data => {
        
      });
  }

  getValueFormControl(index:number, prop: string){
    return this.componentCollaboratorDetailsEvaluate.getRawValue()[index][prop];
  }

  confirmFinalizedEvaluation(){

    CustomValidations.marcarFormGroupTouched(this.evaluateFormGroup);
    
    if(this.evaluateFormGroup.invalid)
      return;

      const evaluateComponent: IComponentCollaboratorEvaluate = { ...this.evaluateFormGroup.getRawValue() } ;
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
