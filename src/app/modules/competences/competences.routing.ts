import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompetencesComponent } from '@modules/competences/competences.component';
import { BehaviorsByLevelComponent } from './pages/behaviors-by-level/behaviors-by-level.component';
import { CompetencesListComponent } from '@modules/competences/pages/competences-list/competences-list.component';

const routes: Routes = [
  {
    path: '',
    component: CompetencesComponent,
    children: [
      {
        path:'',
        component: CompetencesListComponent
      },
      {
        path:'behaviours-by-level',
        component: BehaviorsByLevelComponent
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetencesRouting { }
