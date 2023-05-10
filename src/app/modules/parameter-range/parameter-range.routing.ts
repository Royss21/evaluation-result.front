import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParameterRangeListComponent } from './pages/parameter-range-list/parameter-range-list.component';
import { ParameterRangeComponent } from './parameter-range.component';

export const roots: Routes = [
  {
    path: '',
    component: ParameterRangeComponent,
    children: [
      {
        path: '',
        component: ParameterRangeListComponent,
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
export class ParameterRangeRoutingModule {}
