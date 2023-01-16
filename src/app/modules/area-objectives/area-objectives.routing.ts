import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AreaObjectivesComponent } from '@modules/area-objectives/area-objectives.component';
import { AreaObjectivesListComponent } from '@modules/area-objectives/pages/area-objectives-list/area-objectives-list.component';

const routes: Routes = [
  {
    path: '',
    component: AreaObjectivesComponent,
    children: [
      {
        path:'',
        component: AreaObjectivesListComponent
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
export class AreaObjectivesRouting { }
