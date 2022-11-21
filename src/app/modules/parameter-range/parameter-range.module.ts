import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ParameterRangeRoutingModule } from './parameter-range.routing';
import { SharedModule } from '@shared/modules/shared.module';

import { ParameterRangeComponent } from './parameter-range.component';
import { ParameterRangeListComponent } from './pages/parameter-range-list/parameter-range-list.component';
import { ParameterRangeModalComponent } from './components/parameter-range-modal/parameter-range-modal.component';
import { ComponentsModule } from '@components/components.module';
import { ParameterValueModalComponent } from './components/parameter-value-modal/parameter-value-modal.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    ParameterRangeComponent,
    ParameterRangeListComponent,
    ParameterRangeModalComponent,
    ParameterValueModalComponent
  ],
  imports: [
    CommonModule,
    ParameterRangeRoutingModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    NgxMaskModule.forChild()
  ],
  exports: [
    ParameterRangeComponent,
    ParameterRangeListComponent
  ]
})
export class ParameterRangeModule { }
