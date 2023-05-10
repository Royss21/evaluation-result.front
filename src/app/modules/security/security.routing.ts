import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SecurityComponent } from '@modules/security/security.component';
import { SecurityOptionComponent } from '@modules/security/views/security-option/security-option.component';

const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    children: [
      {
        path: '',
        component: SecurityOptionComponent,
      },
      {
        path: 'audit',
        loadChildren: () =>
          import('../audit-entity/audit-entity.module').then(
            (m) => m.AuditEntityModule
          ),
      },
      {
        path: 'logs-system',
        loadChildren: () =>
          import('../logs-system/logs-system.module').then(
            (m) => m.LogsSystemModule
          ),
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
export class SecurityRouting {}
