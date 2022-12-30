import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-objective-card',
  templateUrl: './objective-card.component.html',
  styleUrls: ['./objective-card.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ObjectiveCardComponent),
      multi: true
    }
  ]
})
export class ObjectiveCardComponent implements OnInit, ControlValueAccessor {

  @Input() subcomponentName: string;
  @Input() minimunPercentage: number;
  @Input() maximunPercentage: number;
  @Input() valueCurrent: number = 0;
  @Input() isCompleted: boolean;

  objective: { valueInput: number | string | null } = { valueInput: null }
  valueResult: number | string = 0;

  private _onChanged: Function = ( valueResult: number) => {}
  private _onTouched: Function = () => {}

  constructor() {

  }

  onChange(value: any) {

    if(value && value.startsWith('.'))
      value = `0${value}`;

    this.objective.valueInput = value;
    this._onTouched();
    this._onChanged?.(!value?  null  : Number(value.toString().replace(',', "")));
  }

  writeValue(value: number): void {

  }

  registerOnChange(fn: any): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  ngOnInit(): void {
    this.objective.valueInput = ((this.valueCurrent || 0) * 100).toString();
  }

}
