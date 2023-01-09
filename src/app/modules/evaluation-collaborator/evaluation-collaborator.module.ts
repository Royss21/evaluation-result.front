import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationCollaboratorRoutingModule } from './evaluation-collaborator.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from '@components/components.module';
import { EvaluationCollaboratorListComponent } from './pages/evaluation-collaborator-list/evaluation-collaborator-list.component';
import { EvaluationCollaboratorComponent } from './evaluation-collaborator.component';
import { RegisterCollaboratorModalComponent } from './components/register-collaborator-modal/register-collaborator-modal.component';
import { EvaluationFeedbackComponent } from './pages/evaluation-feedback/evaluation-feedback.component';
import { CoreModule } from '@core/core.module';
import { EvaluatedComponentsComponent } from './components/evaluated-components/evaluated-components.component';
import { EvaluationApprovalComponent } from './pages/evaluation-approval/evaluation-approval.component';


@NgModule({
  declarations: [
    EvaluationCollaboratorListComponent,
    EvaluationCollaboratorComponent,
    RegisterCollaboratorModalComponent,
    EvaluationFeedbackComponent,
    EvaluatedComponentsComponent,
    EvaluationApprovalComponent
  ],
  imports: [
    CommonModule,
    EvaluationCollaboratorRoutingModule,
    RouterModule,
    SharedModule,
    CoreModule,
    ComponentsModule
  ],
  exports: [
    EvaluationCollaboratorListComponent,
    EvaluationCollaboratorComponent,
    RegisterCollaboratorModalComponent
  ]
})
export class EvaluationCollaboratorModule { }
