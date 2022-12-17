import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaintenanceComponent } from '@modules/maintenance/maintenance.component';
import { OptionComponent } from '@modules/maintenance/views/option/option.component';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceComponent,
    children: [
      {
        path: '',
        component: OptionComponent
      },
      {
        path: 'collaborator',
        loadChildren: () => import('../collaborator/collaborator.module').then(m => m.CollaboratorModule)
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
export class MaintenanceRoutingModule { }
