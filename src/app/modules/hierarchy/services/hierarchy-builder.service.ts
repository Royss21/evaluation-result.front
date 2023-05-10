import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IHierarchy } from '@modules/hierarchy/interfaces/hierarchy.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';

@Injectable({
  providedIn: 'root',
})
export class HierarchyBuilderService {
  constructor(private _fb: FormBuilder) {}

  public buildHierarchyForm(hierarchy: IHierarchy): FormGroup {
    return this._fb.group({
      id: [hierarchy?.id || null],
      name: [
        hierarchy?.name || null,
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(100),
        ],
      ],
      levelId: [hierarchy?.levelId || null, [Validators.required]],
    });
  }
}
