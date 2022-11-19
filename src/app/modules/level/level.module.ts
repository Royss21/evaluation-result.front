import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LevelRoutingModule } from './level.routing';
import { SharedModule } from "src/app/shared/modules/shared.module";
import { ComponentsModule } from '@components/components.module';


import { LevelListComponent } from './pages/level-list/level-list.component';
import { LevelComponent } from './level.component';
import { LevelModalComponent } from './components/level-modal/level-modal.component';


@NgModule({
  declarations: [
    LevelListComponent,
    LevelComponent,
    LevelModalComponent
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
