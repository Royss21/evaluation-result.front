import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ConfigurationComponent } from './configuration.component';
import { OptionComponent } from './views/option/option.component';
import { ConfigurationRoutingModule } from './configuration.routing';



@NgModule({
  declarations: [
    ConfigurationComponent,
    OptionComponent
  ],
  imports: [
    ConfigurationRoutingModule,
    RouterModule,
    CommonModule
  ],
  exports: [
    ConfigurationComponent,
    OptionComponent
  ]
})
export class ConfigurationModule { }
