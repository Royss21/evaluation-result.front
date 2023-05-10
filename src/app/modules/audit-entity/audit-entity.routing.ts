import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditEntityComponent } from '@modules/audit-entity/audit-entity.component';
import { AuditEntityListComponent } from '@modules/audit-entity/pages/audit-entity-list/audit-entity-list.component';

const routes: Routes = [
  {
    path: '',
    component: AuditEntityComponent,
    children: [
      {
        path: '',
        component: AuditEntityListComponent,
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
export class AuditEntityRouting {}
