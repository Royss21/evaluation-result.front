import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from '@components/components.module';
import { CorporateObjectivesRoutingModule } from './corporate-objectives.routing';
import { AssignChargeModalComponent } from './components/assign-charge-modal/assign-charge-modal.component';
import { CorporateObjectivesListComponent } from './pages/corporate-objectives-list/corporate-objectives-list.component';
import { CorporateObjectivesModalComponent } from './components/corporate-objectives-modal/corporate-objectives-modal.component';

@NgModule({
  declarations: [
    AssignChargeModalComponent,
    CorporateObjectivesListComponent,
    CorporateObjectivesModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    CorporateObjectivesRoutingModule,
  ],
  exports: [CorporateObjectivesListComponent],
})
export class CorporateObjectivesModule {}
