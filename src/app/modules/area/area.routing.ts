import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AreaComponent } from '@modules/area/area.component';
import { AreaListComponent } from '@modules/area/pages/area-list/area-list.component';

const routes: Routes = [
  {
    path: '',
    component: AreaComponent,
    children: [
      {
        path: '',
        component: AreaListComponent,
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaRoutingModule {}
