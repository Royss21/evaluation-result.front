import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChargeComponent } from '@modules/charge/charge.component';
import { ChargeListComponent } from '@modules/charge/pages/charge-list/charge-list.component';

const routes: Routes = [{
  path: '',
  component: ChargeComponent,
  children: [
    {
      path: '',
      component: ChargeListComponent,
    },
    {
      path:'',
      redirectTo:'',
      pathMatch: 'full'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChargeRoutingModule { }
