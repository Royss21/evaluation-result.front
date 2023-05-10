import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogsSystemComponent } from '@modules/logs-system/logs-system.component';
import { LogsSystemListComponent } from '@modules/logs-system/views/logs-system-list/logs-system-list.component';

const routes: Routes = [
  {
    path: '',
    component: LogsSystemComponent,
    children: [
      {
        path: '',
        component: LogsSystemListComponent,
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
export class LogsSystemRouting {}
