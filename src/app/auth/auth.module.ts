import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth.routing';
import { AuthComponent } from '@auth/auth.component';
import { SharedModule } from '@shared/shared.module';
import { LoginComponent } from '@auth/pages/login/login.component';
import { CheckRoleComponent } from './components/check-role/check-role.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    CheckRoleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
