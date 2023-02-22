import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRouting } from './reports.routing';
import { SharedModule } from '@shared/shared.module';
import { ReportsComponent } from './reports.component';
import { ComponentsModule } from '@components/components.module';
import { ReportsOptionComponent } from './views/reports-option/reports-option.component';


@NgModule({
  declarations: [
    ReportsComponent,
    ReportsOptionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRouting,
    ComponentsModule
  ]
})
export class ReportsModule { }
