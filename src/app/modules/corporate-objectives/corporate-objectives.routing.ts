import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CorporateObjectivesComponent } from './corporate-objectives.component';
import { CorporateObjectivesListComponent } from './pages/corporate-objectives-list/corporate-objectives-list.component';

export const roots: Routes = [
  {
    path: '',
    component: CorporateObjectivesComponent,
    children: [
      {
        path: '',
        component: CorporateObjectivesListComponent,
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(roots)],
  exports: [RouterModule],
})
export class CorporateObjectivesRoutingModule {}
