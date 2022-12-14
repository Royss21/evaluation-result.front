import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationCollaboratorComponent } from './evaluation-collaborator.component';
import { EvaluationCollaboratorListComponent } from './pages/evaluation-collaborator-list/evaluation-collaborator-list.component';

export const routes: Routes = [
  {
    path: '',
    component: EvaluationCollaboratorComponent,
    children: [
      {
        path:'',
        component: EvaluationCollaboratorListComponent
      },
      {
        path:'',
        redirectTo:'',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports:[ RouterModule.forChild( routes ) ],
  exports:[ RouterModule ]
})
export class EvaluationCollaboratorRoutingModule { }