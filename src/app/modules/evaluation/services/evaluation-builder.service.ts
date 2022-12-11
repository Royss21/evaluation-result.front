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
        null,
        [Validators.required]
      ],
      endDate: [
        null,
        [Validators.required]
      ],
      isEvaluationTest: [
        null,
        [Validators.required]
      ],
      components: this._fb.array(
        compSelection.map(comp => this.createComponents(comp))
      )
    });
  }

  createComponents(comp: any): FormGroup {
    return this._fb.group({
      id: [comp.id],
      img: [comp.img],
      checked: [comp.checked],
      title: [comp.title],
      subtitle: [comp.subtitle]
    })
  }

  public builderCorpGoals(): FormGroup {
    return this._fb.group({
      startDate: [null],
      endDate: [null]
    });
  }

  public builderCompetences(): FormGroup {

    const compLocal: ICompetences[] = [
      {
        startDate: null,
        endDate: null,
        title: 'Etapa de Evaluación por Competencias',
        description: 'En esta etapa se realiza la evaluación de cada colaborador mediante las competencias registradas'
      },
      {
        startDate: null,
        endDate: null,
        title: 'Etapa de Calibración',
        description: 'En esta etapa la nota de los colaboradores serán reguladas por los calibradores asignados.'
      }
    ]

    return this._fb.group({
      competences: this._fb.array(
        compLocal.map(comp => this.createCompetences(comp))
      )
    });
  }

  createCompetences(comp: ICompetences): FormGroup {
    return this._fb.group({
      startDate: [comp.startDate],
      endDate: [comp.endDate],
      title: [comp.title],
      description: [comp.description]
    });
  }

  public builderEvaluationStage(): FormGroup {
    return this._fb.group({
      startDate: [null],
      endDate: [null]
    });
  }

}
