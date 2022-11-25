import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAreaGoals, ICalibrationStage, ICorpGoals, IEvaluationStage } from '@modules/evaluation/interfaces/evaluation.interface';

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
        (period?.startDate || null),
        [Validators.required]
      ],
      endDate: [
        (period?.endDate || null),
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
    })
  }

  public builderCompetences(area?: IAreaGoals): FormGroup {
    return this._fb.group({
      startDate: [
        (area?.startDate || null),
        [Validators.required]
      ],
      endDate: [
        (area?.endDate || null),
        [Validators.required]
      ]
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
    })
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
    })
  }
}
