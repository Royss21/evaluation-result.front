import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GerencyRoutingModule } from './gerency-routing.module';
import { GerencyComponent } from './gerency.component';
import { GerencyListComponent } from './pages/gerency-list/gerency-list.component';


@NgModule({
  declarations: [
    GerencyComponent,
    GerencyListComponent
  ],
  imports: [
    CommonModule,
    GerencyRoutingModule
  ]
})
export class GerencyModule { }
