import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EvaluationComponent } from '@modules/evaluation/evaluation.component';
import { EvaluationAddComponent } from '@modules/evaluation/pages/evaluation-add/evaluation-add.component';
import { EvaluationDetailComponent } from '@modules/evaluation/pages/evaluation-detail/evaluation-detail.component';
import { EvaluationEditComponent } from '@modules/evaluation/pages/evaluation-edit/evaluation-edit.component';
import { EvaluationListComponent } from '@modules/evaluation/pages/evaluation-list/evaluation-list.component';

const routes: Routes = [
  {
    path: '',
    component: EvaluationComponent,
    children: [
      {
        path: 'list',
        component: EvaluationListComponent
      },
      {
        path: 'edit',
        component: EvaluationEditComponent
      },
      {
        path: 'edit/:id',
        component: EvaluationEditComponent
      },
      {
        path: 'add',
        component: EvaluationAddComponent
      },
      {
        path: 'detail',
        component: EvaluationDetailComponent
      },
      {
        path:'',
        redirectTo:'list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationRouting { }
