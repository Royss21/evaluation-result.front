import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationCollaboratorRoutingModule } from './evaluation-collaborator.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/modules/shared.module';
import { ComponentsModule } from '@components/components.module';
import { EvaluationCollaboratorListComponent } from './pages/evaluation-collaborator-list/evaluation-collaborator-list.component';
import { EvaluationCollaboratorComponent } from './evaluation-collaborator.component';
import { RegisterCollaboratorModalComponent } from './components/register-collaborator-modal/register-collaborator-modal.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';


@NgModule({
  declarations: [
    EvaluationCollaboratorListComponent,
    EvaluationCollaboratorComponent,
    RegisterCollaboratorModalComponent,
    FeedbackComponent
  ],
  imports: [
    CommonModule,
    EvaluationCollaboratorRoutingModule,
    RouterModule,
    SharedModule,
    ComponentsModule
  ],
  exports: [
    EvaluationCollaboratorListComponent,
    EvaluationCollaboratorComponent,
    RegisterCollaboratorModalComponent
  ]
})
export class EvaluationCollaboratorModule { }
