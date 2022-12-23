import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GerencyComponent } from '@modules/gerency/gerency.component';
import { GerencyListComponent } from '@modules/gerency/pages/gerency-list/gerency-list.component';

const routes: Routes = [{
  path: '',
  component: GerencyComponent,
  children: [
    {
      path: '',
      component: GerencyListComponent
    },
    {
      path:'',
      redirectTo:'',
      pathMatch: 'full'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerencyRoutingModule { }
