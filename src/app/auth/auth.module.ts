import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth.routing';
import { AuthComponent } from '@auth/auth.component';
import { SharedModule } from '@shared/modules/shared.module';
import { LoginComponent } from '@auth/pages/login/login.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
