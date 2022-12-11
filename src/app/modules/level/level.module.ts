import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LevelRoutingModule } from './level.routing';
import { SharedModule } from "src/app/shared/modules/shared.module";
import { ComponentsModule } from '@components/components.module';


import { LevelListComponent } from './pages/level-list/level-list.component';
import { LevelComponent } from './level.component';
import { LevelModalComponent } from './components/level-modal/level-modal.component';
import { ExampleFormComponent } from './pages/example-form/example-form.component';
import { ChildComponent } from './pages/exampleForm/child/child.component';


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
