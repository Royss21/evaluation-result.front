import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluateComponent } from './evaluate.component';
import { EvaluateAreaObjectivesComponent } from './pages/evaluate-area-objectives/evaluate-area-objectives.component';
import { EvaluateCompetenciesComponent } from './pages/evaluate-competencies/evaluate-competencies.component';
import { EvaluateCorporateObjectivesComponent } from './pages/evaluate-corporate-objectives/evaluate-corporate-objectives.component';
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
      {
        path: 'area-objectives/:componentCollaboratorId',
        component: EvaluateAreaObjectivesComponent
      },
      {
        path: 'corporate-objectives/:componentCollaboratorId',
        component: EvaluateCorporateObjectivesComponent
      },
      {
        path: 'competencies/:componentCollaboratorId',
        component: EvaluateCompetenciesComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluateComponentRoutingModule { }
