import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeImportLeader } from '@shared/constants/enums-general';

@Injectable({
  providedIn: 'root'
})
export class LeaderImportModalBuilderService {

  constructor(private _fb: FormBuilder) { }

  public buildLeaderImportForm(): FormGroup {
    return this._fb.group({
      files: [ null,  [ Validators.required ] ],
      evaluationId: [ null ],
      isToReprocess: [ false ],
      typeImportLeaders: [ TypeImportLeader.competencies ],
    });
  }
}
