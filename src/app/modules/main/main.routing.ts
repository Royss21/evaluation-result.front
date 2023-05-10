import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { MainComponent } from './main.component';

import { WelcomComponent } from './views/welcom/welcom.component';

export const roots: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: WelcomComponent,
      },
      {
        path: 'period',
        loadChildren: () =>
          import('../period/period.module').then((m) => m.PeriodModule),
      },
      {
        path: 'evaluation',
        loadChildren: () =>
          import('../evaluation/evaluation.module').then(
            (m) => m.EvaluationModule
          ),
      },
      {
        path: 'configuration',
        loadChildren: () =>
          import('../configuration/configuration.module').then(
            (m) => m.ConfigurationModule
          ),
      },
      {
        path: 'maintenance',
        loadChildren: () =>
          import('../maintenance/maintenance.module').then(
            (m) => m.MaintenanceModule
          ),
      },
      {
        path: 'security',
        loadChildren: () =>
          import('../security/security.module').then((m) => m.SecurityModule),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('../reports/reports.module').then((m) => m.ReportsModule),
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(roots)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
