import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeriodRouting } from './period.routing';
import { PeriodEditComponent } from './page/period-edit/period-edit.component';
import { PeriodListComponent } from './page/period-list/period-list.component';
import { PeriodComponent } from './period.component';
import { SharedModule } from "src/app/shared/modules/shared.module";


@NgModule({
  declarations: [
    PeriodEditComponent,
    PeriodListComponent,
    PeriodComponent
  ],
  imports: [
    CommonModule,
    PeriodRouting,
    SharedModule
  ]
})
export class PeriodModule { }
