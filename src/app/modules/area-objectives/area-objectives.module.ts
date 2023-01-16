import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from '@components/components.module';
import { AreaObjectivesRouting } from './area-objectives.routing';
import { AreaObjectivesComponent } from './area-objectives.component';
import { AreaObjectivesListComponent } from './pages/area-objectives-list/area-objectives-list.component';
import { AreaObjectivesModalComponent } from './components/area-objectives-modal/area-objectives-modal.component';
import { AssignChargesModalComponent } from './components/assign-charges-modal/assign-charges-modal.component';

@NgModule({
  declarations: [
    AreaObjectivesComponent,
    AreaObjectivesListComponent,
    AreaObjectivesModalComponent,
    AssignChargesModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    AreaObjectivesRouting
  ]
})
export class AreaObjectivesModule { }
