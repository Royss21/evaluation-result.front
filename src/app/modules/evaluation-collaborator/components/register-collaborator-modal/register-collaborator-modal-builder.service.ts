import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEvaluationCollaborator } from '@modules/evaluation-collaborator/interfaces/evaluation-collaborator.interfaces';
import { CustomValidations } from '@shared/helpers/custom-validations';

@Injectable({
  providedIn: 'root'
})
export class RegisterCollaboratorModalBuilderService {

  constructor(private _fb: FormBuilder) { }

  public buildEvaluationCollaboratorForm(): FormGroup {
    return this._fb.group({
      chargeName: [ '', [ Validators.required, CustomValidations.NotEmpty]],
      areaName: [ '', [ Validators.required, CustomValidations.NotEmpty]],
      hierarchyName: [ '', [ Validators.required, CustomValidations.NotEmpty]],
      levelName: [ '', [ Validators.required, CustomValidations.NotEmpty]],
      gerencyName: [ '', [ Validators.required, CustomValidations.NotEmpty]],
      collaboratorId: [ '', [ Validators.required, CustomValidations.NotEmpty]],
    });
  }
}
