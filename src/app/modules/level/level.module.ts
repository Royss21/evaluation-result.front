import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LevelRoutingModule } from './level.routing';
import { SharedModule } from "src/app/shared/modules/shared.module";
import { ComponentsModule } from '@components/components.module';


import { LevelEditComponent } from './pages/level-edit/level-edit.component';
import { LevelListComponent } from './pages/level-list/level-list.component';
import { LevelComponent } from './level.component';


@NgModule({
  declarations: [
    LevelEditComponent,
    LevelListComponent,
    LevelComponent
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
