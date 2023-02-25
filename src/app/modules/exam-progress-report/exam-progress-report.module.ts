import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from '@components/components.module';
import { ExamProgressReportRouting } from './exam-progress-report.routing';
import { ExamProgressReportComponent } from '@modules/exam-progress-report/exam-progress-report.component';
import { ExamProgressReportListComponent } from '@modules/exam-progress-report/views/exam-progress-report-list/exam-progress-report-list.component';


@NgModule({
  declarations: [
    ExamProgressReportComponent,
    ExamProgressReportListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ExamProgressReportRouting
  ]
})
export class ExamProgressReportModule { }
