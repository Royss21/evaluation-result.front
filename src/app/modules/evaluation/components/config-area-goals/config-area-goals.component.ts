import { Component, Input, OnChanges, OnDestroy, SimpleChanges, forwardRef, OnInit } from '@angular/core';
import {
  Validator,
  FormGroup,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { EvaluationBuilderService } from '@modules/evaluation/services/evaluation-builder.service';


@Component({
  selector: 'app-config-area-goals',
  templateUrl: './config-area-goals.component.html',
  styleUrls: ['./config-area-goals.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ConfigAreaGoalsComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ConfigAreaGoalsComponent,
      multi: true
    }
  ]
})
export class ConfigAreaGoalsComponent implements OnChanges, OnDestroy, ControlValueAccessor, Validator {

  public configAreaFormGroup: FormGroup;

  private _onChanged: Function = (_value: any) => {}
  private _onTouched: Function = (_value: any) => {}
  @Input() public isRequired: boolean;

  constructor(
    private _fb: FormBuilder,
    private _evaluationBuilderService: EvaluationBuilderService
  ) {
    this.configAreaFormGroup = this._evaluationBuilderService.builderCorpGoals();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isRequired'].currentValue) {
      this.configAreaFormGroup = this._evaluationBuilderService.builderCorpGoals();
    }
    // this.configAreaFormGroup.valueChanges
    //   .subscribe(() => {
    //     this._onChanged(this.configAreaFormGroup.value);
    //     this._onTouched(this.configAreaFormGroup.value);
    //   });
  }

  ngOnDestroy(): void {
    this.configAreaFormGroup.reset();
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.configAreaFormGroup.controls;
  }

  writeValue(obj: any): void {
    console.log("OBJ: ", obj);
    this.configAreaFormGroup.setValue(obj);
  }
  registerOnChange(fn: Function): void {
    // this._onChanged = fn;
    this.configAreaFormGroup.valueChanges.subscribe(val => fn(val));
  }
  registerOnTouched(fn: Function): void {
    // this._onTouched = fn;
    this.configAreaFormGroup.valueChanges.subscribe(val => fn(val));
  }

  validate(_control: AbstractControl): ValidationErrors | null {
    //PROPAGAR ERROR AL FORM PADRE
    return this.configAreaFormGroup.valid
      ? null
      : { invalidConfigAreaGoals: true }
  }

}
