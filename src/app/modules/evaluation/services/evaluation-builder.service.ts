import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAreaGoals, ICalibrationStage, ICompetences, ICorpGoals, IEvaluationStage } from '@modules/evaluation/interfaces/evaluation.interface';

import { IPeriod } from '@modules/period/interfaces/period.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';

@Injectable({
  providedIn: 'root'
})
export class EvaluationBuilderService {

  constructor(private _fb: FormBuilder) { }

  public buildPeriodForm(period?: IPeriod): FormGroup {
    return this._fb.group({
      id: [period?.id || 0],
      name: [
        period?.name || null,
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(70)
        ]
      ],
      weight: [
        period?.weight || null,
        [
          Validators.required,
          CustomValidations.NotEmpty
        ]
      ],
      startDate: [
        period?.startDate || null,
        [Validators.required]
      ],
      endDate: [
        period?.endDate || null,
        [Validators.required]
      ],
      isEvaluationTest: [
        period?.isEvaluationTest || null,
        [Validators.required]
      ]
    });
  }

  public builderCorpGoals(corpGoals?: ICorpGoals): FormGroup {
    return this._fb.group({
      startDate: [
        (corpGoals?.startDate || null),
        [Validators.required]
      ],
      endDate: [
        (corpGoals?.endDate || null),
        [Validators.required]
      ],
      isCalc: [
        (corpGoals?.isCalc || false),
        [Validators.required]
      ],
    });
  }

  public builderCompetences(competences?: ICompetences): FormGroup {

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
    })
  }

  public builderEvaluationStage(evaluation?: IEvaluationStage): FormGroup {
    return this._fb.group({
      startDate: [
        (evaluation?.startDate || null),
        [Validators.required]
      ],
      endDate: [
        (evaluation?.endDate || null),
        [Validators.required]
      ]
    });
  }

  public builderCalibrationStage(calibration?: ICalibrationStage): FormGroup {
    return this._fb.group({
      startDate: [
        (calibration?.startDate || null),
        [Validators.required]
      ],
      endDate: [
        (calibration?.endDate || null),
        [Validators.required]
      ]
    });
  }
}
