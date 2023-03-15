import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { ICollaborator } from '@modules/collaborator/interfaces/collaboator-not-in-evaluation.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';
@Injectable({
  providedIn: 'root'
})
export class CollaboratorBuilderService {

  public maxLengthDocumentType: number = 8;

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
      identityDocumentId: [
        collaborator?.identityDocumentId || 1,
        [ Validators.required]
      ],
      documentNumber: [
        collaborator?.documentNumber || null,
        [
          Validators.required,
          CustomValidations.NotEmpty,
          collaborator?.identityDocumentId ? this._documentTypeValidator(collaborator?.identityDocumentId) : Validators.pattern("^[0-9]{8}")
        ]
      ],
      chargeId: [
        { value: collaborator?.chargeId || null, disabled: true },
        [ Validators.required]
      ],
      areaId: [
        { value: collaborator?.areaId || null, disabled: true },
        [ Validators.required]
      ],
      gerencyId: [
        collaborator?.gerencyId || null,
        [ Validators.required]
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

  private _documentTypeValidator(documentType?: number): ValidatorFn | undefined {
    let validator;
    switch (documentType) {
      case 1: // DNI
        this.maxLengthDocumentType = 8;
        validator = Validators.pattern("^[0-9]{8}");
        break;
      case 2:  // PASAPORTE
      case 3:  // C.E
        this.maxLengthDocumentType = 12;
        validator = Validators.pattern("^[a-zA-Z0-9]{12}");
        break;
    }
    return validator;
  }
}


