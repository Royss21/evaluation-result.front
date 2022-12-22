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
import { ResumeComponentComponent } from './components/resume-component/resume-component.component';
import { EvaluationAddComponent } from './pages/evaluation-add/evaluation-add.component';
import { EvaluationDetailComponent } from './pages/evaluation-detail/evaluation-detail.component';
import { ComponentItemComponent } from './components/component-item/component-item.component';
import { StageEvaluateItemComponent } from './components/stage-evaluate-item/stage-evaluate-item.component';
import { EvaluationCurrentCardComponent } from './components/evaluation-current-card/evaluation-current-card.component';


@NgModule({
  declarations: [
    EvaluationListComponent,
    EvaluationEditComponent,
    EvaluationComponent,
    ConfigNewPeriodComponent,
    ConfigCorpGoalsComponent,
    ConfigCompetenciesComponent,
    ConfigAreaGoalsComponent,
    ResumeComponentComponent,
    EvaluationAddComponent,
    EvaluationDetailComponent,
    ComponentItemComponent,
    StageEvaluateItemComponent,
    EvaluationCurrentCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    EvaluationRouting
  ]
})
export class EvaluationModule { }
