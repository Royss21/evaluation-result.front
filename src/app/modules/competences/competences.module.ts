import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { CompetencesRouting } from './competences.routing';
import { CompetencesComponent } from './competences.component';
import { ComponentsModule } from '@components/components.module';
import { CompetencesListComponent } from './pages/competences-list/competences-list.component';
import { CompetencesModalComponent } from './components/competences-modal/competences-modal.component';
import { BehaviorsByLevelComponent } from './pages/behaviors-by-level/behaviors-by-level.component';

@NgModule({
  declarations: [
    CompetencesComponent,
    CompetencesListComponent,
    CompetencesModalComponent,
    BehaviorsByLevelComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    CompetencesRouting
  ]
})
export class CompetencesModule { }
