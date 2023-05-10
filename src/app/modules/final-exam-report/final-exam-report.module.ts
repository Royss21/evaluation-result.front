import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from '@components/components.module';
import { FinalExamReportRouting } from './final-exam-report.routing';
import { FinalExamReportComponent } from './final-exam-report.component';
import { FinalExamReportListComponent } from './views/final-exam-report-list/final-exam-report-list.component';

@NgModule({
  declarations: [FinalExamReportComponent, FinalExamReportListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    FinalExamReportRouting,
  ],
})
export class FinalExamReportModule {}
