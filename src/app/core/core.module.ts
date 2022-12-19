import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberFormatPipe } from './pipes/number-format';
import { OnlyNumberDirective } from './directives/only-number';



@NgModule({
  declarations: [
    NumberFormatPipe,
    OnlyNumberDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NumberFormatPipe,
    OnlyNumberDirective,
  ]
})
export class CoreModule { }
