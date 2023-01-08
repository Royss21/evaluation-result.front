import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRouting } from './user.routing';
import { UserComponent } from './user.component';
import { SharedModule } from '@shared/modules/shared.module';
import { ComponentsModule } from '@components/components.module';
import { UserListComponent } from './pages/user-list/user-list.component';


@NgModule({
  declarations: [
    UserComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserRouting,
    SharedModule,
    ComponentsModule,
  ]
})
export class UserModule { }
