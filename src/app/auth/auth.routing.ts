import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@core/guards/auth.guard';
import { AuthComponent } from '@auth/auth.component';
import { LoginComponent } from '@auth/pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    canLoad:[AuthGuard ],
    canActivate:[AuthGuard ],
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path:'',
        redirectTo:'login',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
