import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EvaluationRouting } from './evaluation.routing';
import { EvaluationComponent } from './evaluation.component';
import { SharedModule } from '@shared/modules/shared.module';
import { EvaluationListComponent } from './pages/evaluation-list/evaluation-list.component';
import { ResumeComponentComponent } from './components/resume-component/resume-component.component';
import { EvaluationAddComponent } from './pages/evaluation-add/evaluation-add.component';
import { EvaluationDetailComponent } from './pages/evaluation-detail/evaluation-detail.component';
import { ComponentItemComponent } from './components/component-item/component-item.component';
import { StageEvaluateItemComponent } from './components/stage-evaluate-item/stage-evaluate-item.component';
import { EvaluationCurrentCardComponent } from './components/evaluation-current-card/evaluation-current-card.component';
import { CoreModule } from '@angular/flex-layout';
import { CardComponentComponent } from './components/card-component/card-component.component';


@NgModule({
  declarations: [
    EvaluationListComponent,
    EvaluationComponent,
    ResumeComponentComponent,
    EvaluationAddComponent,
    EvaluationDetailComponent,
    ComponentItemComponent,
    StageEvaluateItemComponent,
    EvaluationCurrentCardComponent,
    CardComponentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CoreModule,
    EvaluationRouting
  ]
})
export class EvaluationModule { }
