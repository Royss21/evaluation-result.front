import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaRoutingModule } from './area.routing';
import { SharedModule } from '@shared/shared.module';
import { AreaComponent } from '@modules/area/area.component';
import { ComponentsModule } from '@components/components.module';
import { AreaListComponent } from '@modules/area/pages/area-list/area-list.component';
import { AreaModalComponent } from './components/area-modal/area-modal.component';

@NgModule({
  declarations: [AreaComponent, AreaListComponent, AreaModalComponent],
  imports: [CommonModule, SharedModule, ComponentsModule, AreaRoutingModule],
})
export class AreaModule {}
