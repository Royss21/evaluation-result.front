import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GerencyComponent } from './gerency.component';
import { GerencyRoutingModule } from './gerency.routing';
import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from '@components/components.module';
import { GerencyListComponent } from './pages/gerency-list/gerency-list.component';
import { GerencyModalComponent } from '@modules/gerency/components/gerency-modal/gerency-modal.component';

@NgModule({
  declarations: [
    GerencyComponent,
    GerencyListComponent,
    GerencyModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    GerencyRoutingModule
  ]
})
export class GerencyModule { }
