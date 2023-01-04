import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ICollaborator } from '@modules/collaborator/interfaces/collaboator-not-in-evaluation.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';
@Injectable({
  providedIn: 'root'
})
export class CollaboratorBuilderService {

  constructor(private _fb: FormBuilder) { }

  public buildCollaboratorForm(collaborator?: ICollaborator): FormGroup {
    return this._fb.group({
      id: [collaborator?.id || null],
      name: [
        collaborator?.name || null,
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(200)
        ]
      ],
      middleName: [
        collaborator?.middleName || null,
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(200)
        ]
      ],
      lastName: [
        collaborator?.lastName || null,
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(200)
        ]
      ],
      documentNumber: [
        collaborator?.documentNumber || null,
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(40)
        ]
      ],
      chargeId: [
        collaborator?.chargeId || null,
        [
          Validators.required,
        ]
      ],
      chargeName: [
        collaborator?.chargeName || null,
        [Validators.required]
      ],
      areaName: [
        collaborator?.areaName || null,
        [Validators.required]
      ],
      gerencyName: [
        collaborator?.gerencyName || null,
        [Validators.required]
      ],
      email: [
        collaborator?.email || null,
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100)
        ]
      ],
      code: [collaborator?.code || ''],
      dateBirthday: [collaborator?.dateBirthday || null],
      dateAdmission: [
        collaborator?.dateAdmission || null,
        [Validators.required]
      ],
      dateEgress: [collaborator?.dateEgress || null]
    });
  }
}
