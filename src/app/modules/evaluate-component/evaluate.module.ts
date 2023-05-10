import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { EvaluateComponentRoutingModule } from './evaluate.routing';
import { ComponentsModule } from '@components/components.module';

import { ListCollaboratorEvaluateComponent } from './pages/list-collaborator-evaluate/list-collaborator-evaluate.component';
import { EvaluateComponent } from './evaluate.component';
import { EvaluateAreaObjectivesComponent } from './pages/evaluate-area-objectives/evaluate-area-objectives.component';
import { EvaluateCorporateObjectivesComponent } from './pages/evaluate-corporate-objectives/evaluate-corporate-objectives.component';
import { EvaluateCompetenciesComponent } from './pages/evaluate-competencies/evaluate-competencies.component';
import { ObjectiveCardComponent } from './components/objective-card/objective-card.component';
import { CompetencyCardComponent } from './components/competency-card/competency-card.component';
import { ConductItemComponent } from './components/conduct-item/conduct-item.component';
import { StatusComponent } from './components/status/status.component';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    ListCollaboratorEvaluateComponent,
    EvaluateComponent,
    EvaluateAreaObjectivesComponent,
    EvaluateCorporateObjectivesComponent,
    EvaluateCompetenciesComponent,
    ObjectiveCardComponent,
    CompetencyCardComponent,
    ConductItemComponent,
    StatusComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    CoreModule,
    EvaluateComponentRoutingModule,
  ],
  exports: [
    ListCollaboratorEvaluateComponent,
    EvaluateComponent,
    EvaluateAreaObjectivesComponent,
    EvaluateCorporateObjectivesComponent,
    EvaluateCompetenciesComponent,
  ],
})
export class EvaluateComponentModule {}
