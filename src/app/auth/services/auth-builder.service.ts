import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthBuilderService {

  constructor(private _fb: FormBuilder) { }

  public builderLoginForm(): FormGroup {
    return this._fb.group({
      username: [
        null,
        [Validators.required, Validators.email]
      ],
      password: [
        null,
        [Validators.required]
      ]
    })
  }
}
