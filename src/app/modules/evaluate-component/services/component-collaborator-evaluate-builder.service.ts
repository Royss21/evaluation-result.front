import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IComponentCollaborator, IComponentCollaboratorConduct, IComponentCollaboratorDetail } from '../interfaces/component-collaborator.interface';

@Injectable({
  providedIn: 'root'
})
export class ComponentCollaboratorEvaluateBuilderService {

  constructor(private _fb: FormBuilder) { }

  public buildComponentCollaboratorEvaluateForm(data: IComponentCollaborator | null, componentId: number): FormGroup {
    return this._fb.group({
      id:[data?.id],
      evaluationComponentId:[data?.evaluationComponentId],
      evaluationComponentStageId:[data?.evaluationComponentStageId],
      stageId:[data?.stageId],
      componentId: [componentId],
      comment:[data?.comment || '', [Validators.required]],
      componentCollaboratorDetailsEvaluate:  this._fb.array([])
    });
  }

  public buildComponentCollaboratorDetailEvaluateForm(detail: IComponentCollaboratorDetail, isValidate: boolean = true): FormGroup {
    return this._fb.group({
      id:[detail.id],
      subcomponentName:[detail.subcomponentName],
      maximunPercentage:[detail.maximunPercentage],
      minimunPercentage:[detail.minimunPercentage],
      valueResult:[detail.valueResult, isValidate ? [Validators.required] : []],
      componentCollaboratorConductsEvaluate: this._fb.array([])
    });
  }

  public buildComponentCollaboratorConductEvaluateForm(detail: IComponentCollaboratorConduct): FormGroup {
    return this._fb.group({
      id:[detail.id],
      conductDescription:[detail.conductDescription],
      pointValue:[detail.pointValue, [Validators.required]],
      isSelected:[(detail.pointValue || 0) > 0],
    });
  }


}
