import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRouting } from './role.routing';
import { RoleComponent } from './role.component';
import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from '@components/components.module';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { RoleModalComponent } from './components/role-modal/role-modal.component';


@NgModule({
  declarations: [
    RoleComponent,
    RoleListComponent,
    RoleModalComponent
  ],
  imports: [
    RoleRouting,
    CommonModule,
    SharedModule,
    ComponentsModule,
  ]
})
export class RoleModule { }
