import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/modules/shared.module';
import { ComponentsModule } from '@components/components.module';
import { CollaboratorRoutingModule } from './collaborator.routing';
import { CollaboratorComponent } from '@modules/collaborator/collaborator.component';
import { CollaboratorListComponent } from '@modules/collaborator/pages/collaborator-list/collaborator-list.component';

@NgModule({
  declarations: [
    CollaboratorComponent,
    CollaboratorListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    CollaboratorRoutingModule
  ]
})
export class CollaboratorModule { }
