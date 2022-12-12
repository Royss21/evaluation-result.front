import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvaluationHelper } from '@modules/evaluation/helpers/evaluation.helpers';
import { ICompetences } from '@modules/evaluation/interfaces/evaluation.interface';

import { CustomValidations } from '@shared/helpers/custom-validations';

@Injectable({
  providedIn: 'root'
})
export class EvaluationBuilderService {

  constructor(private _fb: FormBuilder) { }

  public buildEvaluationForm(): FormGroup {

    const compSelection = EvaluationHelper.componentsArray;
    const competencesArr: ICompetences[] = EvaluationHelper.stageEvaluationArr;

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
          CustomValidations.NotEmpty
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
      components: this._fb.array(compSelection.map(comp => this.createComponents(comp))
      ),
      stages: this._fb.array(
        competencesArr.map(comp => this.createCompetencesFormArray(comp, true))
      ),
    });
  }

  createComponents(comp: any): FormGroup {
    return this._fb.group({
      id: [comp.id],
      img: [comp.img],
      checked: [comp.checked],
      // checked: [{value: comp.checked, disabled: true}],
      title: [comp.title],
      subtitle: [comp.subtitle]
    })
  }

  public builderCorpGoals(isRequired: boolean = false): FormGroup {
    if (isRequired) {
      return this._fb.group({
        startDate: [null, Validators.required],
        endDate: [null, Validators.required]
      });
    } else {
      return this._fb.group({
        startDate: [null],
        endDate: [null]
      });
    }
  }

  public builderCompetences(isRequired: boolean = false): FormGroup {
    const compLocal: ICompetences[] = EvaluationHelper.competencesStageArr;
    return this._fb.group({
      competences: this._fb.array(
        compLocal.map(comp => this.createCompetencesFormArray(comp, isRequired))
      )
    });
  }

  createCompetencesFormArray(comp: ICompetences, isRequired: boolean = false): FormGroup {
    if (isRequired) {
      return this._fb.group({
        startDate: [comp.startDate, Validators.required],
        endDate: [comp.endDate, Validators.required],
        title: [comp.title],
        description: [comp.description]
      });
    } else {
      return this._fb.group({
        startDate: [comp.startDate],
        endDate: [comp.endDate],
        title: [comp.title],
        description: [comp.description]
      });
    }
  }
}
