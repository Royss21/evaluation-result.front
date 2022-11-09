import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodListComponent } from '@modules/period/page/period-list/period-list.component';
import { PeriodEditComponent } from '@modules/period/page/period-edit/period-edit.component';
import { PeriodComponent } from './period.component';


const routes: Routes = [
  {
    path: '',
    component: PeriodComponent,
    children: [
      {
        path: 'list',
        component: PeriodListComponent
      },
      {
        path: 'edit',
        component: PeriodEditComponent
      },
      {
        path: 'edit/:id',
        component: PeriodEditComponent
      },
      {
        path:'',
        redirectTo:'list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodRouting { }
