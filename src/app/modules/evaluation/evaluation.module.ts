import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EvaluationRouting } from './evaluation.routing';
import { EvaluationComponent } from './evaluation.component';
import { SharedModule } from '@shared/shared.module';
import { EvaluationSectionComponent } from './pages/evaluation-section/evaluation-section.component';
import { ResumeComponentComponent } from './components/resume-component/resume-component.component';
import { EvaluationAddComponent } from './pages/evaluation-add/evaluation-add.component';
import { EvaluationDetailComponent } from './pages/evaluation-detail/evaluation-detail.component';
import { ComponentItemComponent } from './components/component-item/component-item.component';
import { StageEvaluateItemComponent } from './components/stage-evaluate-item/stage-evaluate-item.component';
import { EvaluationCurrentCardComponent } from './components/evaluation-current-card/evaluation-current-card.component';
import { CoreModule } from '@angular/flex-layout';
import { CardComponentComponent } from './components/card-component/card-component.component';
import { ReviewStageListComponent } from './pages/review-stage-list/review-stage-list.component';
import { ComponentsModule } from '@components/components.module';
import { EvaluationHistoryComponent } from './pages/evaluation-history/evaluation-history.component';

@NgModule({
  declarations: [
    EvaluationSectionComponent,
    EvaluationComponent,
    ResumeComponentComponent,
    EvaluationAddComponent,
    EvaluationDetailComponent,
    ComponentItemComponent,
    StageEvaluateItemComponent,
    EvaluationCurrentCardComponent,
    CardComponentComponent,
    ReviewStageListComponent,
    EvaluationHistoryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CoreModule,
    ComponentsModule,
    EvaluationRouting,
  ],
})
export class EvaluationModule {}
