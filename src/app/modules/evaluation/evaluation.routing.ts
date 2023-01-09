import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EvaluationComponent } from '@modules/evaluation/evaluation.component';
import { EvaluationAddComponent } from '@modules/evaluation/pages/evaluation-add/evaluation-add.component';
import { EvaluationDetailComponent } from '@modules/evaluation/pages/evaluation-detail/evaluation-detail.component';
import { EvaluationSectionComponent } from '@modules/evaluation/pages/evaluation-section/evaluation-section.component';
import { ReviewStageListComponent } from './pages/review-stage-list/review-stage-list.component';

const routes: Routes = [
  {
    path: '',
    component: EvaluationComponent,
    children: [
      {
        path: 'section',
        component: EvaluationSectionComponent
      },
      {
        path: 'create',
        component: EvaluationAddComponent
      },
      {
        path: ':evaluationId/detail',
        component: EvaluationDetailComponent
      },
      {
        path: ':evaluationId/review-stage/:stageId',
        component: ReviewStageListComponent
      },
      {
        path:':evaluationId/leader',
        loadChildren: () => import('../evaluation-leader/leader.module').then( m => m.LeaderModule )
      },
      {
        path:':evaluationId/collaborator',
        loadChildren: () => import('../evaluation-collaborator/evaluation-collaborator.module').then( m => m.EvaluationCollaboratorModule )
      },
      {
        path:':evaluationId/evaluate-component/:componentId',
        loadChildren: () => import('../evaluate-component/evaluate.module').then( m => m.EvaluateComponentModule )
      },
      {
        path:'',
        redirectTo:'section',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationRouting { }
