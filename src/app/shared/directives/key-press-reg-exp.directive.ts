import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'input[keyPressRegExp]',
})
export class KeyPressRegExpDirective {
  @Input() keyPressRegExp!: string;
  constructor() {}

  @HostListener('keypress', ['$event'])
  onKeyPress(event: { key: string }) {
    return new RegExp(this.keyPressRegExp).test(event.key);
  }
}
