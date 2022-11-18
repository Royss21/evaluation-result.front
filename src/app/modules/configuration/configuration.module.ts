import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from "src/app/shared/modules/shared.module";

import { ConfigurationComponent } from './configuration.component';
import { OptionComponent } from './views/option/option.component';
import { ConfigurationRoutingModule } from './configuration.routing';
import { CardOptionComponent } from './components/card-option/card-option.component';



@NgModule({
  declarations: [
    ConfigurationComponent,
    OptionComponent,
    CardOptionComponent
  ],
  imports: [
    ConfigurationRoutingModule,
    RouterModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    ConfigurationComponent,
    OptionComponent,
    CardOptionComponent
  ]
})
export class ConfigurationModule { }
