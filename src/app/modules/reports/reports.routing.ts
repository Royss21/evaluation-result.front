import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from '@modules/reports/reports.component';
import { ReportsOptionComponent } from '@modules/reports/views/reports-option/reports-option.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: '',
        component: ReportsOptionComponent,
      },
      {
        path: 'final-exam',
        loadChildren: () =>
          import('../final-exam-report/final-exam-report.module').then(
            (m) => m.FinalExamReportModule
          ),
      },
      {
        path: 'exam-progress',
        loadChildren: () =>
          import('../exam-progress-report/exam-progress-report.module').then(
            (m) => m.ExamProgressReportModule
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
export class ReportsRouting {}
