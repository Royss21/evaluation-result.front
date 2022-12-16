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

  objective: { valueInput: number | null} = { valueInput: null }
  valueResult: number = 0;

  private _onChanged: Function = ( valueResult: number) => {}
  private _onTouched: Function = () => {}

  constructor() { }

  onInput() {
    
    this._onTouched();
    this._onChanged?.(this.objective.valueInput);
  }

  writeValue(value: number): void {
    if (value) {
      this.valueResult = value || 0;
    } else {
      this.valueResult = 0;
    }
  }

  registerOnChange(fn: any): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  ngOnInit(): void {
  }

}
