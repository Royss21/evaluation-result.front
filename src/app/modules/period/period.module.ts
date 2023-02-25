import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodRouting } from './period.routing';

import { RouterModule } from '@angular/router';
import { PeriodComponent } from './period.component';
import { SharedModule } from "@shared/shared.module";
import { PeriodListComponent } from './page/period-list/period-list.component';
import { ComponentsModule } from '@components/components.module';
import { PeriodModalComponent } from './components/period-modal/period-modal.component';

@NgModule({
  declarations: [
    PeriodListComponent,
    PeriodComponent,
    PeriodModalComponent,
  ],
  imports: [
    CommonModule,
    PeriodRouting,
    SharedModule,
    RouterModule,
    ComponentsModule
  ]
})
export class PeriodModule { }
