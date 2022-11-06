import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodRouting } from './period.routing';

import { RouterModule } from '@angular/router';
import { PeriodComponent } from './period.component';
import { SharedModule } from "@shared/modules/shared.module";
import { PeriodEditComponent } from './page/period-edit/period-edit.component';
import { PeriodListComponent } from './page/period-list/period-list.component';

@NgModule({
  declarations: [
    PeriodEditComponent,
    PeriodListComponent,
    PeriodComponent
  ],
  imports: [
    CommonModule,
    PeriodRouting,
    SharedModule,
    RouterModule
  ]
})
export class PeriodModule { }
