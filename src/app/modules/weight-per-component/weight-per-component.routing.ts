import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeightPerComponentListComponent } from '@modules/weight-per-component/pages/weight-per-component-list/weight-per-component-list.component';
import { WeightPerComponentComponent } from '@modules/weight-per-component/weight-per-component.component';

const routes: Routes = [
  {
    path: '',
    component: WeightPerComponentComponent,
    children: [
      {
        path: '',
        component: WeightPerComponentListComponent
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
export class WeightPerComponentRouting { }
