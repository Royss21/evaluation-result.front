import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExamProgressReportComponent } from '@modules/exam-progress-report/exam-progress-report.component';
import { ExamProgressReportListComponent } from '@modules/exam-progress-report/views/exam-progress-report-list/exam-progress-report-list.component';

const routes: Routes = [
  {
    path: '',
    component: ExamProgressReportComponent,
    children: [
      {
        path: 'list',
        component: ExamProgressReportListComponent,
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
export class ExamProgressReportRouting {}
