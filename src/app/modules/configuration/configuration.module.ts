import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '@components/components.module';
import { OptionComponent } from './views/option/option.component';
import { ConfigurationComponent } from './configuration.component';
import { SharedModule } from "@shared/shared.module";
import { ConfigurationRoutingModule } from './configuration.routing';

@NgModule({
  declarations: [
    ConfigurationComponent,
    OptionComponent
  ],
  imports: [
    ConfigurationRoutingModule,
    RouterModule,
    CommonModule,
    SharedModule,
    ComponentsModule
  ],
  exports: [
    ConfigurationComponent,
    OptionComponent
  ]
})
export class ConfigurationModule { }
