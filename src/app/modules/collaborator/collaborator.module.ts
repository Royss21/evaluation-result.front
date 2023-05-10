import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from '@components/components.module';
import { CollaboratorRoutingModule } from './collaborator.routing';
import { CollaboratorComponent } from '@modules/collaborator/collaborator.component';
import { CollaboratorListComponent } from '@modules/collaborator/pages/collaborator-list/collaborator-list.component';
import { CollaboratorModalComponent } from './components/collaborator-modal/collaborator-modal.component';

@NgModule({
  declarations: [
    CollaboratorComponent,
    CollaboratorListComponent,
    CollaboratorModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    CollaboratorRoutingModule,
  ],
})
export class CollaboratorModule {}
