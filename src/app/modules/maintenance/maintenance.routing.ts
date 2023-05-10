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
        component: OptionComponent,
      },
      {
        path: 'collaborator',
        loadChildren: () =>
          import('../collaborator/collaborator.module').then(
            (m) => m.CollaboratorModule
          ),
      },
      {
        path: 'gerency',
        loadChildren: () =>
          import('../gerency/gerency.module').then((m) => m.GerencyModule),
      },
      {
        path: 'hierarchy',
        loadChildren: () =>
          import('../hierarchy/hierarchy.module').then(
            (m) => m.HierarchyModule
          ),
      },
      {
        path: 'charge',
        loadChildren: () =>
          import('../charge/charge.module').then((m) => m.ChargeModule),
      },
      {
        path: 'area',
        loadChildren: () =>
          import('../area/area.module').then((m) => m.AreaModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('../user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'role',
        loadChildren: () =>
          import('../role/role.module').then((m) => m.RoleModule),
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceRoutingModule {}
