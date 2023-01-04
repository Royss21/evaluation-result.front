import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyPressRegExpDirective } from './key-press-reg-exp.directive';
import { StringOnlyDirective } from '@shared/directives/string-only.directive';

const directives = [KeyPressRegExpDirective, StringOnlyDirective];

@NgModule({
    imports: [CommonModule],
    declarations: directives,
    exports: directives
})
export class SharedDirectivesModule {}
