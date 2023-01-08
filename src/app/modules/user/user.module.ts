import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRouting } from './user.routing';
import { UserComponent } from './user.component';
import { UserListComponent } from './pages/user-list/user-list.component';


@NgModule({
  declarations: [
    UserComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserRouting
  ]
})
export class UserModule { }
