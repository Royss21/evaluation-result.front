import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from '@components/components.module';
import { OptionComponent } from './views/option/option.component';
import { ConfigurationComponent } from './configuration.component';
import { ConfigurationRoutingModule } from './configuration.routing';

@NgModule({
  declarations: [ConfigurationComponent, OptionComponent],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    ComponentsModule,
    ConfigurationRoutingModule,
  ],
  exports: [ConfigurationComponent, OptionComponent],
})
export class ConfigurationModule {}
