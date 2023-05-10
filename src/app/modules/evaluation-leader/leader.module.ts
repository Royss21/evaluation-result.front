import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaderRoutingModule } from './leader.routing';
import { LeaderComponent } from './leader.component';
import { LeaderListComponent } from './pages/leader-list/leader-list.component';
import { LeaderImportModalComponent } from './components/leader-import-modal/leader-import-modal.component';
import { RouterModule } from '@angular/router';
import { AssignedCollaboratorsModalComponent } from './components/assigned-collaborators-modal/assigned-collaborators-modal.component';
import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from '@components/components.module';

@NgModule({
  declarations: [
    LeaderComponent,
    LeaderListComponent,
    LeaderImportModalComponent,
    AssignedCollaboratorsModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LeaderRoutingModule,
    SharedModule,
    ComponentsModule,
  ],
})
export class LeaderModule {}
