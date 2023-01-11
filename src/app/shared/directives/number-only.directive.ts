import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
@Directive({
  selector: '[NumbersOnly]'
})
export class NumberOnlyDirective {

  @Output() numberChanged = new EventEmitter<number>();

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onChange(event: any) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue === this._el.nativeElement.value) {
      this.numberChanged.emit(initalValue);
    }
  }

}
