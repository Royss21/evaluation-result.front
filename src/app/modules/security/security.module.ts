import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRouting } from './security.routing';
import { SecurityComponent } from './security.component';
import { SecurityOptionComponent } from './views/security-option/security-option.component';
import { ComponentsModule } from '@components/components.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SecurityComponent, SecurityOptionComponent],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    SecurityRouting,
    ComponentsModule,
  ],
  exports: [SecurityComponent, SecurityOptionComponent],
})
export class SecurityModule {}
