import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IWeightPerComponent } from '@modules/weight-per-component/interfaces/weight-per-component.interface';

@Injectable({
  providedIn: 'root'
})
export class WeightPerComponentBuilderService {

  constructor(private _fb: FormBuilder) { }

  public buildWeightPerComponentForm(weightPerComponent: IWeightPerComponent): FormGroup {
    return this._fb.group({
      id: [weightPerComponent?.id || 0],
    });
  }
}
