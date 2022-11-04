import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodListComponent } from 'src/app/modules/period/page/period-list/period-list.component';
import { PeriodNewComponent } from 'src/app/modules/period/page/period-new/period-new.component';
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
        path: 'new',
        component: PeriodNewComponent
      },
      {
        path: 'edit/:id',
        component: PeriodNewComponent
      },
      {
        path:'',
        redirectTo:'list',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodRouting { }
