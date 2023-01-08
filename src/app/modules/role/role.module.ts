import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleComponent } from './role.component';
import { RoleRouting } from './role.routing';
import { RoleListComponent } from './pages/role-list/role-list.component';


@NgModule({
  declarations: [
    RoleComponent,
    RoleListComponent
  ],
  imports: [
    CommonModule,
    RoleRouting
  ]
})
export class RoleModule { }
