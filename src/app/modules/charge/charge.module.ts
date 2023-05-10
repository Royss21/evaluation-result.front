import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChargeComponent } from './charge.component';
import { ChargeRoutingModule } from './charge.routing';
import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from '@components/components.module';
import { ChargeModalComponent } from './components/charge-modal/charge-modal.component';
import { ChargeListComponent } from '@modules/charge/pages/charge-list/charge-list.component';

@NgModule({
  declarations: [ChargeComponent, ChargeListComponent, ChargeModalComponent],
  imports: [CommonModule, SharedModule, ComponentsModule, ChargeRoutingModule],
})
export class ChargeModule {}
