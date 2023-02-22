import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from "@shared/shared.module";
import { MaintenanceRoutingModule } from './maintenance.routing';
import { ComponentsModule } from '@components/components.module';
import { OptionComponent } from './views/option/option.component';
import { MaintenanceComponent } from '@modules/maintenance/maintenance.component';

@NgModule({
  declarations: [
    MaintenanceComponent,
    OptionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    MaintenanceRoutingModule
  ]
})
export class MaintenanceModule { }
