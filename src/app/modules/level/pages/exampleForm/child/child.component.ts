import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from '@angular/forms';
import { CustomValidations } from '@shared/helpers/custom-validations';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChildComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChildComponent),
      multi: true
    }
  ],
})
export class ChildComponent implements OnInit ,ControlValueAccessor{

  public formGroupTest: FormGroup = new FormGroup(
    {
      password: new FormControl('', [ Validators.required]),
      confirmPassword: new FormControl(null),
    }
  );

  //@Input() formGroupTest : FormGroup;

  constructor() {}
  
  ngOnInit(): void {
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    this.formGroupTest.markAllAsTouched();
    console.log('validate')
    return control.errors;
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.formGroupTest.controls;
  }

  writeValue(value: any) {
    this.formGroupTest.setValue(value);
  }

  registerOnChange(fn: Function) {
    console.log('registerOnChange')
    this.formGroupTest.valueChanges.subscribe((val) => fn(val));
  }

  registerOnTouched(fn: Function) {
    console.log('registerOnTouched')
    this.formGroupTest.valueChanges.subscribe((val) => fn(val));
  }
}
