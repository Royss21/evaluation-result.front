import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleComponent } from '@modules/role/role.component';
import { RoleListComponent } from '@modules/role/pages/role-list/role-list.component';

const routes: Routes = [
  {
    path: '',
    component: RoleComponent,
    children: [
      {
        path:'',
        component: RoleListComponent
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
export class RoleRouting { }
