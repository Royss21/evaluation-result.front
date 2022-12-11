import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LevelComponent } from "./level.component";
import { ExampleFormComponent } from "./pages/example-form/example-form.component";
import { LevelListComponent } from "./pages/level-list/level-list.component";

export const roots: Routes = [
  {
    path: '',
    component: LevelComponent,
    children: [
      {
        path:'',
        component: LevelListComponent
      },
      {
        path:'prueba',
        component: ExampleFormComponent
      },
      {
        path:'',
        redirectTo:'',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports:[ RouterModule.forChild( roots ) ],
  exports:[ RouterModule ]
})
export class LevelRoutingModule { }
