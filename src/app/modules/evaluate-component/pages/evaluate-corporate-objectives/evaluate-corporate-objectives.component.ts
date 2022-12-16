import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ComponentCollaboratorService } from '@core/services/component-collaborator/component-collaborator.service';
import { ComponentCollaboratorEvaluateBuilderService } from '@modules/evaluate-component/builder-form/component-collaborator-evaluate-builder.service';
import { CustomValidations } from '@shared/helpers/custom-validations';

@Component({
  selector: 'app-evaluate-corporate-objectives',
  templateUrl: './evaluate-corporate-objectives.component.html',
  styleUrls: ['./evaluate-corporate-objectives.component.scss']
})
export class EvaluateCorporateObjectivesComponent implements OnInit {

  private _componentCollaboratorId: string;
  
  evaluateFormGroup: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _componentCollaboratorService: ComponentCollaboratorService,
    private  _formBuilder: ComponentCollaboratorEvaluateBuilderService
  ) {
    this.evaluateFormGroup = _formBuilder.buildComponentCollaboratorEvaluateForm();
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
        console.log(data)
        if(data.componentCollaboratorDetails.length > 0)
        { 
          data.componentCollaboratorDetails.forEach(detail => {
            this.componentCollaboratorDetailsEvaluate.push(this._formBuilder.buildComponentCollaboratorDetailEvaluateForm(detail));
          });
        }
      });
  }

  getValueFormControl(index:number, prop: string){
    return this.componentCollaboratorDetailsEvaluate.getRawValue()[index][prop];
  }

  confirmFinalizedEvaluation(){

    CustomValidations.marcarFormGroupTouched(this.evaluateFormGroup);
    
    if(this.evaluateFormGroup.invalid)
      return;

    console.log(this.evaluateFormGroup.getRawValue());

  }
}
