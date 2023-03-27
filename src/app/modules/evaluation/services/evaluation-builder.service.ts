import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvaluationHelper } from '@modules/evaluation/helpers/evaluation.helpers';
import { ConstantsGeneral } from '@shared/constants';

import { CustomValidations } from '@shared/helpers/custom-validations';
import { IEvaluationComponent, IEvaluationComponentStage } from '../interfaces/evaluation-create.interface';

@Injectable({
  providedIn: 'root'
})
export class EvaluationBuilderService {

  constructor(private _fb: FormBuilder) { }

  public buildEvaluationForm(): FormGroup {

    const evaluationComponents = EvaluationHelper.evaluationComponents;
    const evaluationComponentStages = EvaluationHelper.evaluationComponentStages;

    return this._fb.group({
      periodId: [0],
      name: [
        null,
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(70)
        ]
      ],
      weight: [ 100 ],
      startDate: [
        null, [Validators.required]
      ],
      endDate: [
        null, [ Validators.required ]
      ],
      isEvaluationTest: [
        false, [Validators.required]
      ],
      evaluationComponents: this._fb.array(evaluationComponents.map(c => this.createComponent(c))
      ),
      evaluationComponentStages: this._fb.array(evaluationComponentStages.map(c => this.createStage(c))),
    });
  }

  createComponent(component: IEvaluationComponent): FormGroup {
    return this._fb.group({
      componentId: [component.componentId],
      img: [component.img],
      checked: [component.checked],
      title: [component.title],
      subtitle: [component.subtitle],
      startDate: [
        null,
        []
      ],
      endDate: [
        null,
        []
      ],
    })
  }

  createStage(stage: IEvaluationComponentStage): FormGroup {
    return this._fb.group({
      componentId: [stage.componentId],
      stageId: [stage.stageId],
      title: [stage.title],
      startDate: [
        null,
         [ConstantsGeneral.stages.feedback, ConstantsGeneral.stages.approval].includes(stage.stageId)
         ?[Validators.required]
         :[]
      ],
      endDate: [
        null,
        [ConstantsGeneral.stages.feedback, ConstantsGeneral.stages.approval].includes(stage.stageId)
        ?[Validators.required]
        :[]
      ],
    })
  }
}
