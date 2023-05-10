import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FinalExamReportComponent } from '@modules/final-exam-report/final-exam-report.component';
import { FinalExamReportListComponent } from '@modules/final-exam-report/views/final-exam-report-list/final-exam-report-list.component';

const routes: Routes = [
  {
    path: '',
    component: FinalExamReportComponent,
    children: [
      {
        path: 'list',
        component: FinalExamReportListComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalExamReportRouting {}
