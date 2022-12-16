import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IComponentCollaboratorConduct, IComponentCollaboratorDetail } from '../interfaces/component-collaborator.interface';

@Injectable({
  providedIn: 'root'
})
export class ComponentCollaboratorEvaluateBuilderService {

  constructor(private _fb: FormBuilder) { }

  public buildComponentCollaboratorEvaluateForm(): FormGroup {
    return this._fb.group({
      componentCollaboratorDetailsEvaluate:  this._fb.array([])
    });
  }

  public buildComponentCollaboratorDetailEvaluateForm(detail: IComponentCollaboratorDetail, isValidate: boolean = true): FormGroup {
    return this._fb.group({
      id:[detail.id],
      subcomponentName:[detail.subcomponentName],
      maximunPercentage:[detail.maximunPercentage],
      minimunPercentage:[detail.minimunPercentage],
      valueResult:[null, isValidate ? [Validators.required] : []],
      componentCollaboratorConductsEvaluate: this._fb.array([])
    });
  }

  public buildComponentCollaboratorConductEvaluateForm(detail: IComponentCollaboratorConduct): FormGroup {
    return this._fb.group({
      id:[detail.id],
      conductDescription:[detail.conductDescription],
      valueResult:[detail.pointValue, [Validators.required]]
    });
  }


}
