import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EvaluationRouting } from './evaluation.routing';
import { EvaluationComponent } from './evaluation.component';
import { SharedModule } from '@shared/modules/shared.module';
import { EvaluationListComponent } from './pages/evaluation-list/evaluation-list.component';
import { EvaluationEditComponent } from './pages/evaluation-edit/evaluation-edit.component';


@NgModule({
  declarations: [
    EvaluationListComponent,
    EvaluationEditComponent,
    EvaluationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    EvaluationRouting
  ]
})
export class EvaluationModule { }
