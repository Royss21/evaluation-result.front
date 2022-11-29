import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderComponent } from './leader.component';
import { LeaderListComponent } from './pages/leader-list/leader-list.component';

const routes: Routes = [
  {
    path: '',
    component: LeaderComponent,
    children: [
      {
        path:'',
        component: LeaderListComponent
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
export class LeaderRoutingModule { }
