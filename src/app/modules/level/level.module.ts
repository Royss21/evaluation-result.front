import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelEditComponent } from './pages/level-edit/level-edit.component';
import { LevelListComponent } from './pages/level-list/level-list.component';
import { LevelComponent } from './level.component';
import { RouterModule } from '@angular/router';
import { LevelRoutingModule } from './level.routing';



@NgModule({
  declarations: [
    LevelEditComponent,
    LevelListComponent,
    LevelComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LevelRoutingModule
  ],
  exports: [
    LevelEditComponent,
    LevelListComponent
  ]
})
export class LevelModule { }
