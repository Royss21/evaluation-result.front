import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluateComponentRoutingModule } from './evaluate.routing';
import { ListCollaboratorEvaluateComponent } from './pages/list-collaborator-evaluate/list-collaborator-evaluate.component';
import { EvaluateComponent} from './evaluate.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/modules/shared.module';
import { ComponentsModule } from '@components/components.module';


@NgModule({
  declarations: [
    ListCollaboratorEvaluateComponent,
    EvaluateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    EvaluateComponentRoutingModule
  ]
})
export class EvaluateComponentModule { }
