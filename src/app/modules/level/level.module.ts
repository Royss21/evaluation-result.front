import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LevelComponent } from './level.component';
import { LevelRoutingModule } from './level.routing';
import { ComponentsModule } from '@components/components.module';
import { SharedModule } from "src/app/shared/modules/shared.module";
import { ChildComponent } from './pages/exampleForm/child/child.component';
import { LevelListComponent } from './pages/level-list/level-list.component';
import { ExampleFormComponent } from './pages/example-form/example-form.component';
import { LevelModalComponent } from './components/level-modal/level-modal.component';


@NgModule({
  declarations: [
    LevelListComponent,
    LevelComponent,
    LevelModalComponent,
    ExampleFormComponent,
    ChildComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LevelRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class LevelModule { }
