import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[StringOnly]',
})
export class StringOnlyDirective {
  @Output() numberChanged = new EventEmitter<number>();

  constructor(private _el: ElementRef) {}

  @HostListener('input', ['$event']) onChange() {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(
      /[^A-Za-zñÑäëïöüÄËÏÖÜÁÉÍÓÚáéíóú ]*/g,
      ''
    );
    if (initalValue === this._el.nativeElement.value) {
      this.numberChanged.emit(initalValue);
    }
  }
}
