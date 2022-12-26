import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidations } from '@shared/helpers/custom-validations';

@Component({
  selector: 'app-example-form',
  templateUrl: './example-form.component.html',
  styleUrls: ['./example-form.component.scss']
})
export class ExampleFormComponent implements OnInit {

  public formGroup: FormGroup;

  constructor() {

    this.formGroup = new FormGroup({
      username: new FormControl(''),
      // Nest group
      resetPassword: new FormGroup({
        password: new FormControl('', [ Validators.required]),
        confirmPassword: new FormControl(),
      })
    });
  }
  ngOnInit(): void {

  }

  get f() {
    return this.formGroup.controls;
  }

  onSubmit() {
    CustomValidations.marcarFormGroupTouched(this.formGroup);
  }

}
