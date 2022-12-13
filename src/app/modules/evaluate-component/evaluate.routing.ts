import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluateComponent } from './evaluate.component';
import { ListCollaboratorEvaluateComponent } from './pages/list-collaborator-evaluate/list-collaborator-evaluate.component';

const routes: Routes = [
  {
    path: '',
    component: EvaluateComponent,
    children: [
      {
        path: '',
        component: ListCollaboratorEvaluateComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluateComponentRoutingModule { }
