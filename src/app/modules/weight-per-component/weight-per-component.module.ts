import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from '@components/components.module';
import { WeightPerComponentRouting } from './weight-per-component.routing';
import { WeightPerComponentComponent } from './weight-per-component.component';
import { WeightPerComponentListComponent } from './pages/weight-per-component-list/weight-per-component-list.component';
import { WeightPerComponentModalComponent } from './components/weight-per-component-modal/weight-per-component-modal.component';

@NgModule({
  declarations: [
    WeightPerComponentComponent,
    WeightPerComponentListComponent,
    WeightPerComponentModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    WeightPerComponentRouting,
  ],
})
export class WeightPerComponentModule {}
