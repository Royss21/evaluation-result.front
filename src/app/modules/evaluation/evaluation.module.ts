import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EvaluationRouting } from './evaluation.routing';
import { EvaluationComponent } from './evaluation.component';
import { SharedModule } from '@shared/modules/shared.module';
import { EvaluationListComponent } from './pages/evaluation-list/evaluation-list.component';
import { EvaluationEditComponent } from './pages/evaluation-edit/evaluation-edit.component';
import { ConfigNewPeriodComponent } from './components/config-new-period/config-new-period.component';
import { ConfigCorpGoalsComponent } from './components/config-corp-goals/config-corp-goals.component';
import { ConfigCompetenciesComponent } from './components/config-competencies/config-competencies.component';
import { ConfigAreaGoalsComponent } from './components/config-area-goals/config-area-goals.component';


@NgModule({
  declarations: [
    EvaluationListComponent,
    EvaluationEditComponent,
    EvaluationComponent,
    ConfigNewPeriodComponent,
    ConfigCorpGoalsComponent,
    ConfigCompetenciesComponent,
    ConfigAreaGoalsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    EvaluationRouting
  ]
})
export class EvaluationModule { }
