import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeriodRouting } from './period.routing';
import { PeriodNewComponent } from './page/period-new/period-new.component';
import { PeriodListComponent } from './page/period-list/period-list.component';
import { PeriodComponent } from './period.component';


@NgModule({
  declarations: [
    PeriodNewComponent,
    PeriodListComponent,
    PeriodComponent
  ],
  imports: [
    CommonModule,
    PeriodRouting
  ]
})
export class PeriodModule { }
