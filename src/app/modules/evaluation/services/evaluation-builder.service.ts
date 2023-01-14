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
      weight: [
        null,
        [
          Validators.required,
          Validators.max(100),
          Validators.min(0)
        ]
      ],
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
        ConstantsGeneral.components.competencies === component.componentId
          ? []
          : [Validators.required]
      ],
      endDate: [
        null,
        ConstantsGeneral.components.competencies === component.componentId
          ? []
          : [Validators.required]
      ],
    })
  }

  // public builderCorpGoals(isRequired: boolean = false): FormGroup {
  //   if (isRequired) {
  //     return this._fb.group({
  //       startDate: [null, Validators.required],
  //       endDate: [null, Validators.required]
  //     });
  //   } else {
  //     return this._fb.group({
  //       startDate: [null],
  //       endDate: [null]
  //     });
  //   }
  // }

  // public builderCompetences(isRequired: boolean = false): FormGroup {
  //   const compLocal: ICompetences[] = EvaluationHelper.competencesStageArr;
  //   return this._fb.group({
  //     competences: this._fb.array(
  //       compLocal.map(comp => this.createCompetencesFormArray(comp, isRequired))
  //     )
  //   });
  // }

  createStage(stage: IEvaluationComponentStage): FormGroup {
    return this._fb.group({
      componentId: [stage.componentId],
      stageId: [stage.stageId],
      title: [stage.title],
      startDate: [
        null, [Validators.required]
      ],
      endDate: [
        null, [ Validators.required ]
      ],
    })
  }
}
