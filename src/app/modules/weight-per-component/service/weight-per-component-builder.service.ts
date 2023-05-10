import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IHierarchy } from '@modules/hierarchy/interfaces/hierarchy.interface';
import { IWeightPerComponent } from '@modules/weight-per-component/interfaces/weight-per-component.interface';

@Injectable({
  providedIn: 'root',
})
export class WeightPerComponentBuilderService {
  constructor(private _fb: FormBuilder) {}

  public buildWeightPerComponentForm(
    _weightCorporateObjectives: number | null,
    _weightAreaObjectives: number | null,
    _weightCompetencies: number | null
  ): FormGroup {
    return this._fb.group({
      weightCorporateObjectives: [
        _weightCorporateObjectives,
        [Validators.required, Validators.max(100)],
      ],
      weightAreaObjectives: [
        _weightAreaObjectives,
        [Validators.required, Validators.max(100)],
      ],
      weightCompetencies: [
        _weightCompetencies,
        [Validators.required, Validators.max(100)],
      ],
    });
  }
}
